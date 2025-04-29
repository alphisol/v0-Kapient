"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, ArrowRight, ExternalLink, Globe, Info, Lock, Server, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getScoreColor, getSeverityBadgeColor } from "@/lib/color-utils"

// Sample data structure based on what we can actually retrieve
const serverHealthData = {
  overallScore: 65,

  ssl: {
    score: 58,
    issues: [
      {
        id: "ssl-expiring",
        title: "SSL certificate expiring soon",
        description: "Your SSL certificate will expire in 15 days.",
        impact: "critical",
        detectionMethod: "Puppeteer SSL check",
        recommendation: "Renew your SSL certificate as soon as possible to avoid security warnings.",
        fixUrl: "https://example.com/ssl-renewal",
        simpleExplanation:
          "Your website's security certificate is about to expire. When it does, visitors will see scary warning messages that your site is not secure.",
      },
      {
        id: "mixed-content",
        title: "Mixed content issues",
        description: "7 pages load insecure (HTTP) resources on secure (HTTPS) pages.",
        impact: "high",
        affectedUrls: [
          "/blog (3 images loaded via HTTP)",
          "/products (2 scripts loaded via HTTP)",
          "/about (2 stylesheets loaded via HTTP)",
        ],
        detectionMethod: "Lighthouse security audit",
        recommendation: "Update all resource URLs to use HTTPS instead of HTTP.",
        simpleExplanation:
          "Your secure website is loading some insecure content. This is like having a secure building but leaving a few windows unlocked - browsers will show warnings to visitors.",
      },
      {
        id: "weak-cipher",
        title: "Weak SSL cipher suites enabled",
        description: "Your server supports outdated and insecure cipher suites.",
        impact: "medium",
        detectionMethod: "Puppeteer SSL check",
        recommendation: "Update your server configuration to disable weak cipher suites.",
        simpleExplanation:
          "Your website is using outdated security methods. It's like using old locks that modern thieves know how to pick easily.",
      },
    ],
  },

  dns: {
    score: 72,
    issues: [
      {
        id: "dns-resolution",
        title: "Slow DNS resolution",
        description: "Your domain's DNS resolution is taking 350ms, which is slower than recommended.",
        impact: "medium",
        detectionMethod: "Custom DNS performance check",
        recommendation: "Consider using a faster DNS provider or optimizing your DNS configuration.",
        simpleExplanation:
          "When people type your website address, it takes too long to find your site. It's like having an address that's difficult for the postal service to locate.",
      },
      {
        id: "missing-records",
        title: "Missing DNS records",
        description: "Your domain is missing important DNS records (DMARC, SPF).",
        impact: "high",
        detectionMethod: "Custom DNS check",
        recommendation: "Add the missing DNS records to improve email deliverability and security.",
        missingRecords: ["DMARC", "SPF"],
        simpleExplanation:
          "Your website is missing important email security settings. This makes it easier for scammers to send fake emails that appear to come from your company.",
      },
    ],
  },

  server: {
    score: 68,
    issues: [
      {
        id: "high-ttfb",
        title: "Excessive server response time",
        description: "Your server takes too long to respond (TTFB: 1.2s), well above the recommended 600ms.",
        impact: "critical",
        affectedUrls: ["All pages affected", "Worst: /products (1.8s)", "Worst: /blog (1.5s)"],
        detectionMethod: "Lighthouse TTFB metrics",
        recommendation: "Optimize server configuration, implement caching, or upgrade hosting.",
        simpleExplanation:
          "Your website is taking too long to start loading. This is like a waiter at a restaurant who takes a long time to acknowledge you're there, before even taking your order.",
      },
      {
        id: "server-errors",
        title: "Server errors detected",
        description: "3 URLs are returning 5xx server errors, indicating server-side problems.",
        impact: "critical",
        affectedUrls: [
          "/api/products (500 Internal Server Error)",
          "/checkout (502 Bad Gateway)",
          "/search (503 Service Unavailable)",
        ],
        detectionMethod: "Puppeteer HTTP status code check",
        recommendation: "Investigate server logs and fix the underlying issues causing these errors.",
        simpleExplanation:
          "Some pages on your website are completely broken. Visitors see error messages instead of your content, similar to finding 'Out of Order' signs on doors in a building.",
      },
    ],
  },

  security: {
    score: 62,
    issues: [
      {
        id: "missing-headers",
        title: "Missing security headers",
        description: "Important security headers are missing from your site.",
        impact: "high",
        missingHeaders: ["Content-Security-Policy", "X-Content-Type-Options", "Strict-Transport-Security"],
        detectionMethod: "Puppeteer header analysis",
        recommendation: "Implement the missing security headers to improve site security.",
        simpleExplanation:
          "Your website is missing important security settings. This is like having a home without basic security features like window locks or a doorbell.",
      },
      {
        id: "outdated-software",
        title: "Outdated server software",
        description: "Your server is running outdated software versions with known vulnerabilities.",
        impact: "critical",
        detectionMethod: "Wappalyzer version detection",
        outdatedComponents: [
          { name: "Apache", currentVersion: "2.4.41", recommendedVersion: "2.4.57" },
          { name: "PHP", currentVersion: "7.2.24", recommendedVersion: "8.2.7" },
        ],
        recommendation: "Update your server software to the latest secure versions.",
        simpleExplanation:
          "Your website is running on outdated software with known security problems. It's like using a smartphone that hasn't been updated in years and is vulnerable to viruses.",
      },
    ],
  },

  // Stack information from Wappalyzer
  stack: {
    server: "Apache/2.4.41",
    os: "Ubuntu 20.04",
    cms: "WordPress 6.2.2",
    database: "MySQL 5.7",
    programmingLanguage: "PHP 7.2.24",
    jsFramework: "jQuery 3.5.1",
    cdnProvider: "Cloudflare",
  },
}

export function ServerHealthDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedIssues, setExpandedIssues] = useState<string[]>([])

  const toggleIssue = (issueId: string) => {
    if (expandedIssues.includes(issueId)) {
      setExpandedIssues(expandedIssues.filter((id) => id !== issueId))
    } else {
      setExpandedIssues([...expandedIssues, issueId])
    }
  }

  // Update the getImpactIcon function to use the new color scheme
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "medium":
        return <Info className="h-5 w-5 text-green-500" />
      case "low":
        return <Info className="h-5 w-5 text-green-600" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  // Get all critical issues across all categories
  const getAllCriticalIssues = () => {
    const issues: any[] = []

    // SSL
    serverHealthData.ssl.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "SSL/TLS", subcategory: "Certificate" }))

    // DNS
    serverHealthData.dns.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "DNS", subcategory: "Configuration" }))

    // Server
    serverHealthData.server.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Server", subcategory: "Performance" }))

    // Security
    serverHealthData.security.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Security", subcategory: "Headers" }))

    return issues
  }

  // Get all high impact issues across all categories
  const getAllHighIssues = () => {
    const issues: any[] = []

    // SSL
    serverHealthData.ssl.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "SSL/TLS", subcategory: "Certificate" }))

    // DNS
    serverHealthData.dns.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "DNS", subcategory: "Configuration" }))

    // Server
    serverHealthData.server.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Server", subcategory: "Performance" }))

    // Security
    serverHealthData.security.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Security", subcategory: "Headers" }))

    return issues
  }

  const renderIssueCard = (issue: any, category: string, subcategory: string) => {
    return (
      <div key={issue.id} className="mb-4 border rounded-lg overflow-hidden">
        <div className="p-4 flex items-start">
          <div className="mr-3 mt-0.5 flex-shrink-0">{getImpactIcon(issue.impact)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium">{issue.title}</span>
              <Badge className={getSeverityBadgeColor(issue.impact)}>
                {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-white">
                {category} › {subcategory}
              </Badge>
            </div>
            <p className="text-sm text-[#7D8496] mb-2">{issue.description}</p>

            {/* Simple explanation for non-technical users */}
            <div className="bg-white p-3 rounded-md mb-3 text-sm text-[#323048] border border-[#EAEEF7]">
              <strong>In simple terms:</strong>{" "}
              {issue.simpleExplanation || "This issue could affect how your website performs."}
            </div>

            {/* Visible action buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button size="sm" className="bg-[#537AEF] hover:bg-[#537AEF]/90">
                Fix Now
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
              {issue.fixUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={issue.fixUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    View Details <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#323048]">Server Health Dashboard</h1>
          <div className="flex items-center text-xs sm:text-sm text-[#7D8496] mt-1">
            <span>Dashboard</span>
            <ArrowRight className="h-3 w-3 mx-2" />
            <span className="text-[#537AEF]">Server Health</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Overall Server Health</div>
            <div className="flex items-center justify-between">
              <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(serverHealthData.overallScore)}`}>
                {serverHealthData.overallScore}/100
              </div>
            </div>
            <Progress
              value={serverHealthData.overallScore}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">SSL/TLS Health</div>
            <div className="flex items-center justify-between">
              <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(serverHealthData.ssl.score)}`}>
                {serverHealthData.ssl.score}/100
              </div>
            </div>
            <Progress
              value={serverHealthData.ssl.score}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">DNS Health</div>
            <div className="flex items-center justify-between">
              <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(serverHealthData.dns.score)}`}>
                {serverHealthData.dns.score}/100
              </div>
            </div>
            <Progress
              value={serverHealthData.dns.score}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Security Health</div>
            <div className="flex items-center justify-between">
              <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(serverHealthData.security.score)}`}>
                {serverHealthData.security.score}/100
              </div>
            </div>
            <Progress
              value={serverHealthData.security.score}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 text-[#537AEF] mr-2" />
              Server Stack
            </CardTitle>
            <CardDescription>Technology stack detected by Wappalyzer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Web Server</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.server}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Operating System</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.os}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">CMS</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.cms}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Database</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.database}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Programming Language</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.programmingLanguage}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">JavaScript Framework</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.jsFramework}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">CDN Provider</span>
                <span className="text-[#7D8496]">{serverHealthData.stack.cdnProvider}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Critical Server Issues</CardTitle>
            <CardDescription>
              These issues have the highest impact on your server's health and should be addressed immediately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getAllCriticalIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="ssl" className="text-xs sm:text-sm">
            SSL/TLS
          </TabsTrigger>
          <TabsTrigger value="dns" className="text-xs sm:text-sm">
            DNS
          </TabsTrigger>
          <TabsTrigger value="server" className="text-xs sm:text-sm">
            Server Performance
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-[#EC8290] mr-2" />
                All Server Issues
              </CardTitle>
              <CardDescription>
                All server-related issues detected by Puppeteer, Wappalyzer, and Lighthouse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-3">Critical Issues</h3>
                {getAllCriticalIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-3">High Impact Issues</h3>
                  {getAllHighIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ssl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 text-[#537AEF] mr-2" />
                SSL/TLS Issues
              </CardTitle>
              <CardDescription>Issues related to your SSL certificate and HTTPS implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverHealthData.ssl.issues.map((issue) => renderIssueCard(issue, "SSL/TLS", "Certificate"))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 text-[#537AEF] mr-2" />
                DNS Issues
              </CardTitle>
              <CardDescription>Issues related to your domain's DNS configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverHealthData.dns.issues.map((issue) => renderIssueCard(issue, "DNS", "Configuration"))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="server">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 text-[#537AEF] mr-2" />
                Server Performance Issues
              </CardTitle>
              <CardDescription>Issues related to your server's performance and response time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverHealthData.server.issues.map((issue) => renderIssueCard(issue, "Server", "Performance"))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 text-[#537AEF] mr-2" />
                Security Issues
              </CardTitle>
              <CardDescription>Issues related to your server's security configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverHealthData.security.issues.map((issue) => renderIssueCard(issue, "Security", "Headers"))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

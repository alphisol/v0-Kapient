"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  HelpCircle,
  Info,
  Lock,
  Server,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getScoreColor, getSeverityBadgeColor } from "@/lib/color-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
        isGlobal: true,
        learnMoreText:
          "SSL certificates are digital certificates that authenticate the identity of a website and enable an encrypted connection. When expired, browsers will show security warnings to visitors, potentially driving them away from your site.",
      },
      {
        id: "mixed-content",
        title: "Mixed content issues",
        description: "7 pages load insecure (HTTP) resources on secure (HTTPS) pages.",
        impact: "high",
        affectedUrls: [
          {
            url: "/blog",
            details: "3 images loaded via HTTP",
            items: ["header-image.jpg", "author-profile.jpg", "featured-image.png"],
          },
          { url: "/products", details: "2 scripts loaded via HTTP", items: ["analytics.js", "product-slider.js"] },
          { url: "/about", details: "2 stylesheets loaded via HTTP", items: ["custom-styles.css", "team-section.css"] },
        ],
        detectionMethod: "Lighthouse security audit",
        recommendation: "Update all resource URLs to use HTTPS instead of HTTP.",
        simpleExplanation:
          "Your secure website is loading some insecure content. This is like having a secure building but leaving a few windows unlocked - browsers will show warnings to visitors.",
        isGlobal: false,
        learnMoreText:
          "Mixed content occurs when initial HTML is loaded over a secure HTTPS connection, but other resources (like images, videos, stylesheets, scripts) are loaded over an insecure HTTP connection. This poses security risks as the insecure content could be modified by attackers.",
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
        isGlobal: true,
        learnMoreText:
          "Cipher suites are sets of algorithms that help secure network connections using SSL/TLS. Weak cipher suites can be vulnerable to various attacks, potentially allowing attackers to decrypt sensitive information transmitted between your server and visitors.",
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
        isGlobal: true,
        learnMoreText:
          "DNS (Domain Name System) resolution is the process of translating a domain name into an IP address. Slow DNS resolution increases the time it takes for users to reach your website, affecting the overall user experience and potentially impacting SEO rankings.",
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
        isGlobal: true,
        learnMoreText:
          "DMARC (Domain-based Message Authentication, Reporting, and Conformance) and SPF (Sender Policy Framework) are email authentication methods designed to detect and prevent email spoofing. Without these records, your domain is more vulnerable to being impersonated in phishing attacks.",
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
        affectedUrls: [
          { url: "/", details: "TTFB: 1.2s", items: [] },
          { url: "/products", details: "TTFB: 1.8s", items: [] },
          { url: "/blog", details: "TTFB: 1.5s", items: [] },
        ],
        detectionMethod: "Lighthouse TTFB metrics",
        recommendation: "Optimize server configuration, implement caching, or upgrade hosting.",
        simpleExplanation:
          "Your website is taking too long to start loading. This is like a waiter at a restaurant who takes a long time to acknowledge you're there, before even taking your order.",
        isGlobal: false,
        learnMoreText:
          "Time to First Byte (TTFB) is a measurement of how long it takes for a browser to receive the first byte of response data from the server. High TTFB values indicate server-side performance issues that can significantly impact user experience and search engine rankings.",
      },
      {
        id: "server-errors",
        title: "Server errors detected",
        description: "3 URLs are returning 5xx server errors, indicating server-side problems.",
        impact: "critical",
        affectedUrls: [
          { url: "/api/products", details: "500 Internal Server Error", items: [] },
          { url: "/checkout", details: "502 Bad Gateway", items: [] },
          { url: "/search", details: "503 Service Unavailable", items: [] },
        ],
        detectionMethod: "Puppeteer HTTP status code check",
        recommendation: "Investigate server logs and fix the underlying issues causing these errors.",
        simpleExplanation:
          "Some pages on your website are completely broken. Visitors see error messages instead of your content, similar to finding 'Out of Order' signs on doors in a building.",
        isGlobal: false,
        learnMoreText:
          "5xx server errors indicate problems on the server side rather than with the client's request. These errors prevent users from accessing content and can damage user experience, SEO rankings, and conversion rates if not addressed promptly.",
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
        isGlobal: true,
        learnMoreText:
          "HTTP security headers help protect websites from various attacks like XSS, clickjacking, and other code injection attacks. They instruct browsers on how to behave when handling your site's content, adding an important layer of security to your web application.",
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
        isGlobal: true,
        learnMoreText:
          "Outdated server software often contains known security vulnerabilities that have been patched in newer versions. Attackers specifically target these vulnerabilities, making it crucial to keep all server components updated to the latest stable versions.",
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
    const isExpanded = expandedIssues.includes(issue.id)

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
              {issue.isGlobal && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Site-wide Issue
                </Badge>
              )}
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

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="px-2">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md p-4">
                    <p className="text-sm">{issue.learnMoreText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button variant="outline" size="sm" onClick={() => toggleIssue(issue.id)} className="flex items-center">
                View Details{" "}
                {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable details section */}
        {isExpanded && (
          <div className="border-t p-4 bg-gray-50">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Detection Method</h4>
                <p className="text-sm text-gray-600">{issue.detectionMethod}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Recommendation</h4>
                <p className="text-sm text-gray-600">{issue.recommendation}</p>
              </div>

              {/* For site-wide issues */}
              {issue.isGlobal && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> This is a site-wide issue affecting your entire website. Fixing this issue
                    will resolve the problem across all pages.
                  </p>
                </div>
              )}

              {/* For page-specific issues with affected URLs */}
              {!issue.isGlobal && issue.affectedUrls && issue.affectedUrls.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Affected Pages ({issue.affectedUrls.length})</h4>
                  <div className="space-y-2">
                    {issue.affectedUrls.map((affected: any, index: number) => (
                      <div key={index} className="border rounded-md p-3 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{affected.url}</p>
                            <p className="text-sm text-gray-600">{affected.details}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`https://example.com${affected.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              Visit <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        </div>

                        {/* Show specific items if available */}
                        {affected.items && affected.items.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-500 mb-1">Specific Items:</p>
                            <ul className="text-xs text-gray-600 list-disc pl-4">
                              {affected.items.map((item: string, itemIndex: number) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* For issues with missing headers */}
              {issue.missingHeaders && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Missing Headers</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {issue.missingHeaders.map((header: string, index: number) => (
                      <li key={index}>{header}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* For issues with outdated components */}
              {issue.outdatedComponents && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Outdated Components</h4>
                  <div className="space-y-2">
                    {issue.outdatedComponents.map((component: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{component.name}</span>
                        <span className="text-red-500">
                          {component.currentVersion} <ArrowRight className="inline h-3 w-3" />{" "}
                          <span className="text-green-500">{component.recommendedVersion}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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

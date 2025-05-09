"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Globe,
  HelpCircle,
  Info,
  Lock,
  Server,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getScoreColor } from "@/lib/color-utils"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data structure based on what we can actually retrieve
const serverHealthData = {
  overallScore: 65,

  ssl: {
    score: 58,
    status: "Valid",
    issuer: "Let's Encrypt Authority X3",
    validFrom: "2023-05-01",
    validTo: "2023-07-30",
    daysRemaining: 15,
    issues: [
      {
        id: "ssl-expiring",
        title: "SSL certificate expiring soon",
        description: "Your SSL certificate will expire in 15 days.",
        impact: "high",
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
        impact: "medium",
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
        impact: "low",
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
        impact: "high",
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
        impact: "high",
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

  performance: {
    score: 62,
    issues: [
      {
        id: "slow-loading",
        title: "Slow page loading times",
        description: "Several pages have loading times over 3 seconds.",
        impact: "high",
        affectedUrls: [
          { url: "/products", details: "Load time: 4.2s", items: [] },
          { url: "/blog", details: "Load time: 3.8s", items: [] },
        ],
        detectionMethod: "Lighthouse performance metrics",
        recommendation: "Optimize images, reduce JavaScript, and implement caching.",
        simpleExplanation:
          "Your pages are taking too long to load. This is like a slow-loading app that makes users wait and potentially leave.",
        isGlobal: false,
        learnMoreText:
          "Page load time is a critical factor in user experience and SEO. Studies show that 53% of mobile users abandon sites that take longer than 3 seconds to load, and Google uses page speed as a ranking factor for both mobile and desktop searches.",
      },
      {
        id: "large-images",
        title: "Unoptimized images",
        description: "12 images are unnecessarily large and slowing down your pages.",
        impact: "medium",
        affectedUrls: [
          {
            url: "/products",
            details: "4 large images",
            items: [
              "product1.jpg (2.4MB, should be 240KB)",
              "product2.jpg (3.1MB, should be 310KB)",
              "product3.jpg (1.8MB, should be 180KB)",
              "banner.jpg (4.2MB, should be 420KB)",
            ],
          },
          {
            url: "/about",
            details: "3 large images",
            items: [
              "team.jpg (5.2MB, should be 520KB)",
              "office.jpg (3.8MB, should be 380KB)",
              "ceo.jpg (2.1MB, should be 210KB)",
            ],
          },
        ],
        detectionMethod: "Lighthouse image audit",
        recommendation: "Compress images and use modern formats like WebP.",
        simpleExplanation:
          "Your website has images that are much larger than they need to be. It's like sending a truck to deliver a small package.",
        isGlobal: false,
        learnMoreText:
          "Unoptimized images are one of the most common causes of slow page loads. Modern image formats like WebP can reduce file size by 25-35% compared to JPEG and PNG while maintaining similar quality. Properly sized and compressed images can dramatically improve page load times.",
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
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(true) // For demo purposes, set to true by default
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  // Function to handle "Fix Now" button click
  const handleFixNow = (issueId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      router.push(`/server-health/fix/${issueId}`)
    }, 1000)
  }

  // Update the getImpactIcon function to use the new color scheme
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "low":
        return <Info className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  // Get impact badge color based on severity
  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-white text-red-800 border border-red-500"
      case "medium":
        return "bg-white text-orange-800 border border-orange-500"
      case "low":
        return "bg-white text-yellow-800 border border-yellow-500"
      default:
        return "bg-white text-gray-800 border border-gray-500"
    }
  }

  // Get all critical issues across all categories
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

    // Performance
    serverHealthData.performance.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Performance", subcategory: "Loading" }))

    return issues
  }

  // Get all medium impact issues across all categories
  const getAllMediumIssues = () => {
    const issues: any[] = []

    // SSL
    serverHealthData.ssl.issues
      .filter((issue) => issue.impact === "medium")
      .forEach((issue) => issues.push({ ...issue, category: "SSL/TLS", subcategory: "Certificate" }))

    // DNS
    serverHealthData.dns.issues
      .filter((issue) => issue.impact === "medium")
      .forEach((issue) => issues.push({ ...issue, category: "DNS", subcategory: "Configuration" }))

    // Server
    serverHealthData.server.issues
      .filter((issue) => issue.impact === "medium")
      .forEach((issue) => issues.push({ ...issue, category: "Server", subcategory: "Performance" }))

    // Performance
    serverHealthData.performance.issues
      .filter((issue) => issue.impact === "medium")
      .forEach((issue) => issues.push({ ...issue, category: "Performance", subcategory: "Loading" }))

    return issues
  }

  const renderIssueCard = (issue: any, category: string, subcategory: string) => {
    return (
      <Card key={issue.id} className="mb-4 border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 flex-shrink-0">{getImpactIcon(issue.impact)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{issue.title}</span>
                  <Badge className={getImpactBadgeColor(issue.impact)}>
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
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="px-2 h-8 w-8 rounded-full">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md p-4">
                        <p className="text-sm">{issue.learnMoreText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    size="sm"
                    className="bg-[#537AEF] hover:bg-[#537AEF]/90"
                    onClick={() => handleFixNow(issue.id)}
                  >
                    Fix Now
                  </Button>
                </div>
              </div>
              <p className="text-sm text-[#7D8496] mb-2">{issue.description}</p>

              {/* Simple explanation for non-technical users */}
              <div className="bg-white p-3 rounded-md mb-3 text-sm text-[#323048] border border-[#EAEEF7]">
                <strong>In simple terms:</strong>{" "}
                {issue.simpleExplanation || "This issue could affect how your website performs."}
              </div>

              {/* Expanded details section - always visible now */}
              <div className="border-t p-4 mt-4 bg-gray-50 rounded-md">
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
                        <strong>Note:</strong> This is a site-wide issue affecting your entire website. Fixing this
                        issue will resolve the problem across all pages.
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
                  {issue.missingRecords && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Missing Records</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {issue.missingRecords.map((record: string, index: number) => (
                          <li key={index}>{record}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Test buttons to toggle states
  const testLoadingState = () => {
    setIsLoading(true)
    // Reset after 3 seconds
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const testEmptyState = () => {
    setHasData(false)
    // Reset after 5 seconds
    setTimeout(() => {
      setHasData(true)
    }, 5000)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-[#537AEF] animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-[#323048] mb-2">Loading Server Health Data</h2>
        <p className="text-[#7D8496]">Please wait while we analyze your server...</p>
      </div>
    )
  }

  // Empty state
  if (!hasData) {
    return (
      <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gray-50 p-8 rounded-lg border text-center max-w-md">
          <Server className="h-12 w-12 text-[#537AEF] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#323048] mb-2">No Server Data Available</h2>
          <p className="text-[#7D8496] mb-4">
            We couldn't find any server health data for your website. This could be because your site is new or our
            scanners haven't completed their analysis yet.
          </p>
          <Button className="bg-[#537AEF] hover:bg-[#537AEF]/90" onClick={() => setHasData(true)}>
            Run Server Scan
          </Button>
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

        {/* Test buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-[#537AEF] text-[#537AEF] hover:bg-[#537AEF]/10"
            onClick={testLoadingState}
          >
            Test Loading State
          </Button>
          <Button
            variant="outline"
            className="border-[#537AEF] text-[#537AEF] hover:bg-[#537AEF]/10"
            onClick={testEmptyState}
          >
            Test Empty State
          </Button>
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
              indicatorClassName="bg-[#537AEF]"
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
              indicatorClassName="bg-[#537AEF]"
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
              indicatorClassName="bg-[#537AEF]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Performance</div>
            <div className="flex items-center justify-between">
              <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(serverHealthData.performance.score)}`}>
                {serverHealthData.performance.score}/100
              </div>
            </div>
            <Progress
              value={serverHealthData.performance.score}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-[#537AEF]"
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
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 text-[#537AEF] mr-2" />
              SSL Certificate Information
            </CardTitle>
            <CardDescription>Details about your SSL certificate status and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-medium">Status</span>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                  <span className="text-green-700">{serverHealthData.ssl.status}</span>
                </div>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Issuer</span>
                <span className="text-[#7D8496]">{serverHealthData.ssl.issuer}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Valid From</span>
                <span className="text-[#7D8496]">{serverHealthData.ssl.validFrom}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Valid To</span>
                <span className="text-[#7D8496]">{serverHealthData.ssl.validTo}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Days Remaining</span>
                <div
                  className={`flex items-center ${serverHealthData.ssl.daysRemaining < 30 ? "text-red-500" : "text-green-500"}`}
                >
                  {serverHealthData.ssl.daysRemaining < 30 ? (
                    <AlertCircle className="h-4 w-4 mr-1.5" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                  )}
                  <span>{serverHealthData.ssl.daysRemaining} days</span>
                </div>
              </div>
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
          <TabsTrigger value="performance" className="text-xs sm:text-sm">
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                All Server Issues
              </CardTitle>
              <CardDescription>
                All server-related issues detected by Puppeteer, Wappalyzer, and Lighthouse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-3">High Impact Issues</h3>
                {getAllHighIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-3">Medium Impact Issues</h3>
                  {getAllMediumIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}
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

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 text-[#537AEF] mr-2" />
                Performance Issues
              </CardTitle>
              <CardDescription>Issues related to your website's loading speed and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverHealthData.performance.issues.map((issue) => renderIssueCard(issue, "Performance", "Loading"))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

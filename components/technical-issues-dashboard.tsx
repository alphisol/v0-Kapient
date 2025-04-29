"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  FileCode,
  Globe,
  Info,
  Lock,
  Search,
  Server,
  Shield,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Sample data structure based on our taxonomy
const technicalIssuesData = {
  overallScore: 68,
  criticalIssues: 4,
  highIssues: 7,
  mediumIssues: 12,

  technicalSEO: {
    score: 72,
    crawlability: {
      issues: [
        {
          id: "robots-blocked",
          title: "Critical pages blocked by robots.txt",
          description:
            "3 important pages are blocked by your robots.txt file, preventing search engines from indexing them.",
          impact: "critical",
          affectedUrls: ["/products/category/electronics", "/blog/seo-tips", "/services/web-design"],
          recommendation: "Update your robots.txt file to allow crawling of these important pages.",
          detectionMethod: "Puppeteer robots.txt analysis",
        },
        {
          id: "broken-links",
          title: "Broken internal links detected",
          description: "8 internal links on your site are pointing to non-existent pages (404 errors).",
          impact: "high",
          affectedUrls: [
            "/about-us (linked from homepage)",
            "/products/discontinued-item (linked from 3 pages)",
            "/blog/draft-post (linked from sidebar)",
          ],
          recommendation: "Fix or remove these broken links to improve user experience and crawlability.",
          detectionMethod: "Puppeteer crawl",
        },
      ],
    },
    indexability: {
      issues: [
        {
          id: "noindex-important",
          title: "Unintentional noindex directives",
          description: "2 important pages have noindex directives, preventing them from appearing in search results.",
          impact: "critical",
          affectedUrls: ["/products (meta robots: noindex)", "/contact-us (X-Robots-Tag: noindex)"],
          recommendation: "Remove the noindex directives from these important pages.",
          detectionMethod: "Puppeteer meta robots scan",
        },
        {
          id: "duplicate-content",
          title: "Duplicate content issues",
          description: "4 pages have substantially similar content without proper canonicalization.",
          impact: "medium",
          affectedUrls: ["/products?sort=price", "/products?view=grid", "/products?category=all", "/products"],
          recommendation: "Implement canonical tags to indicate the preferred version of these pages.",
          detectionMethod: "Puppeteer content comparison",
        },
      ],
    },
    renderability: {
      issues: [
        {
          id: "cwv-failures",
          title: "Critical Core Web Vitals failures",
          description: "Your site fails Core Web Vitals assessment on mobile devices.",
          impact: "high",
          metrics: [
            { name: "LCP", value: "4.2s", target: "2.5s", status: "fail" },
            { name: "FID", value: "180ms", target: "100ms", status: "fail" },
            { name: "CLS", value: "0.28", target: "0.1", status: "fail" },
          ],
          recommendation: "Optimize images, reduce JavaScript, and fix layout shifts to improve Core Web Vitals.",
          detectionMethod: "Lighthouse performance metrics",
        },
        {
          id: "mobile-usability",
          title: "Mobile usability issues",
          description: "5 pages have elements that are too close together or text that's too small on mobile devices.",
          impact: "medium",
          affectedUrls: [
            "/products (touch elements too close)",
            "/blog (text too small)",
            "/contact (viewport not configured)",
          ],
          recommendation: "Ensure proper spacing between touch elements and use readable font sizes on mobile.",
          detectionMethod: "Lighthouse mobile-friendly test",
        },
      ],
    },
  },

  serverHealth: {
    score: 65,
    performance: {
      issues: [
        {
          id: "high-ttfb",
          title: "Excessive server response time",
          description: "Your server takes too long to respond (TTFB: 1.2s), well above the recommended 600ms.",
          impact: "critical",
          affectedUrls: ["All pages affected", "Worst: /products (1.8s)", "Worst: /blog (1.5s)"],
          recommendation: "Optimize server configuration, implement caching, or upgrade hosting.",
          detectionMethod: "Lighthouse TTFB metrics",
        },
        {
          id: "resource-bloat",
          title: "Unoptimized resources",
          description: "12 JavaScript and CSS files are unminified and uncompressed.",
          impact: "high",
          affectedUrls: ["/js/main.js (512KB unminified)", "/css/styles.css (245KB unminified)", "10 other resources"],
          recommendation: "Minify and compress JavaScript and CSS files to improve load times.",
          detectionMethod: "Lighthouse performance audit",
        },
      ],
    },
    availability: {
      issues: [
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
          recommendation: "Investigate server logs and fix the underlying issues causing these errors.",
          detectionMethod: "Puppeteer HTTP status code check",
        },
      ],
    },
    configuration: {
      issues: [
        {
          id: "http1",
          title: "Using HTTP/1.1 instead of HTTP/2",
          description: "Your server is using HTTP/1.1, which is less efficient than HTTP/2 for modern websites.",
          impact: "medium",
          recommendation: "Upgrade your server to support HTTP/2 for improved performance.",
          detectionMethod: "Wappalyzer server analysis",
        },
        {
          id: "missing-compression",
          title: "Missing text compression",
          description: "Text-based resources are not being compressed with Gzip or Brotli.",
          impact: "high",
          affectedUrls: ["All HTML, CSS, and JavaScript resources"],
          recommendation: "Enable Gzip or Brotli compression on your server.",
          detectionMethod: "Lighthouse compression audit",
        },
      ],
    },
  },

  security: {
    score: 58,
    ssl: {
      issues: [
        {
          id: "expiring-ssl",
          title: "SSL certificate expiring soon",
          description: "Your SSL certificate will expire in 15 days.",
          impact: "critical",
          recommendation: "Renew your SSL certificate as soon as possible to avoid security warnings.",
          detectionMethod: "Puppeteer SSL check",
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
          recommendation: "Update all resource URLs to use HTTPS instead of HTTP.",
          detectionMethod: "Lighthouse security audit",
        },
        {
          id: "weak-security-headers",
          title: "Missing security headers",
          description: "Important security headers are missing from your site.",
          impact: "medium",
          missingHeaders: ["Content-Security-Policy", "X-Content-Type-Options", "Strict-Transport-Security"],
          recommendation: "Implement the missing security headers to improve site security.",
          detectionMethod: "Puppeteer header analysis",
        },
      ],
    },
    dns: {
      issues: [
        {
          id: "dns-resolution",
          title: "Slow DNS resolution",
          description: "Your domain's DNS resolution is taking 350ms, which is slower than recommended.",
          impact: "medium",
          recommendation: "Consider using a faster DNS provider or optimizing your DNS configuration.",
          detectionMethod: "Custom DNS performance check",
        },
        {
          id: "missing-dnssec",
          title: "DNSSEC not implemented",
          description: "Your domain does not have DNSSEC enabled, making it vulnerable to DNS spoofing.",
          impact: "medium",
          recommendation: "Enable DNSSEC with your domain registrar to improve DNS security.",
          detectionMethod: "Custom DNS security check",
        },
      ],
    },
  },
}

export function TechnicalIssuesDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedIssues, setExpandedIssues] = useState<string[]>([])

  const toggleIssue = (issueId: string) => {
    if (expandedIssues.includes(issueId)) {
      setExpandedIssues(expandedIssues.filter((id) => id !== issueId))
    } else {
      setExpandedIssues([...expandedIssues, issueId])
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
      case "high":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">High</Badge>
      case "medium":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-200 text-green-900 hover:bg-green-200">Low</Badge>
      default:
        return null
    }
  }

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  // Get all critical issues across all categories
  const getAllCriticalIssues = () => {
    const issues: any[] = []

    // Technical SEO
    technicalIssuesData.technicalSEO.crawlability.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Technical SEO", subcategory: "Crawlability" }))

    technicalIssuesData.technicalSEO.indexability.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Technical SEO", subcategory: "Indexability" }))

    technicalIssuesData.technicalSEO.renderability.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Technical SEO", subcategory: "Renderability" }))

    // Server Health
    technicalIssuesData.serverHealth.performance.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Server Health", subcategory: "Performance" }))

    technicalIssuesData.serverHealth.availability.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Server Health", subcategory: "Availability" }))

    technicalIssuesData.serverHealth.configuration.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Server Health", subcategory: "Configuration" }))

    // Security
    technicalIssuesData.security.ssl.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Security", subcategory: "SSL/TLS" }))

    technicalIssuesData.security.dns.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Security", subcategory: "DNS" }))

    return issues
  }

  // Get all high impact issues across all categories
  const getAllHighIssues = () => {
    const issues: any[] = []

    // Technical SEO
    technicalIssuesData.technicalSEO.crawlability.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Technical SEO", subcategory: "Crawlability" }))

    technicalIssuesData.technicalSEO.indexability.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Technical SEO", subcategory: "Indexability" }))

    technicalIssuesData.technicalSEO.renderability.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Technical SEO", subcategory: "Renderability" }))

    // Server Health
    technicalIssuesData.serverHealth.performance.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Server Health", subcategory: "Performance" }))

    technicalIssuesData.serverHealth.availability.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Server Health", subcategory: "Availability" }))

    technicalIssuesData.serverHealth.configuration.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Server Health", subcategory: "Configuration" }))

    // Security
    technicalIssuesData.security.ssl.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Security", subcategory: "SSL/TLS" }))

    technicalIssuesData.security.dns.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Security", subcategory: "DNS" }))

    return issues
  }

  const renderIssueCard = (issue: any, category: string, subcategory: string) => {
    return (
      <Collapsible
        key={issue.id}
        open={expandedIssues.includes(issue.id)}
        onOpenChange={() => toggleIssue(issue.id)}
        className="mb-4 border rounded-lg overflow-hidden"
      >
        <div className="p-4 flex items-start">
          <div className="mr-3 mt-0.5 flex-shrink-0">{getImpactIcon(issue.impact)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium">{issue.title}</span>
              {getImpactBadge(issue.impact)}
              <Badge variant="outline" className="bg-gray-100">
                {category} › {subcategory}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-2">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t pt-3">
            {issue.affectedUrls && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Affected URLs:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
                  {issue.affectedUrls.map((url: string, index: number) => (
                    <li key={index}>{url}</li>
                  ))}
                </ul>
              </div>
            )}

            {issue.metrics && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Metrics:</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {issue.metrics.map((metric: any, index: number) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">{metric.name}</div>
                      <div className="flex items-center justify-between">
                        <span className={metric.status === "fail" ? "text-red-500" : "text-green-500"}>
                          {metric.value}
                        </span>
                        <span className="text-xs text-gray-500">Target: {metric.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {issue.missingHeaders && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Missing Headers:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
                  {issue.missingHeaders.map((header: string, index: number) => (
                    <li key={index}>{header}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Recommendation:</h4>
              <p className="text-sm text-gray-600">{issue.recommendation}</p>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Detection Method:</h4>
              <p className="text-sm text-gray-600">{issue.detectionMethod}</p>
            </div>

            <div className="mt-3 flex justify-end">
              <Button size="sm">Fix Issue</Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Technical Issues Dashboard</h1>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ArrowRight className="h-3 w-3 mx-2" />
            <span className="text-blue-600">Technical Issues</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Overall Technical Score</div>
            <div className="flex items-center justify-between">
              <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(technicalIssuesData.overallScore)}`}>
                {technicalIssuesData.overallScore}/100
              </div>
            </div>
            <Progress
              value={technicalIssuesData.overallScore}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Critical Issues</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold text-red-500">{technicalIssuesData.criticalIssues}</div>
            </div>
            <div className="text-sm text-gray-500 mt-2">Require immediate attention</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">High Impact Issues</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold text-orange-500">{technicalIssuesData.highIssues}</div>
            </div>
            <div className="text-sm text-gray-500 mt-2">Should be fixed soon</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Medium/Low Issues</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold text-yellow-500">{technicalIssuesData.mediumIssues}</div>
            </div>
            <div className="text-sm text-gray-500 mt-2">Improvements recommended</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Critical Issues
          </TabsTrigger>
          <TabsTrigger value="technical-seo" className="text-xs sm:text-sm">
            Technical SEO
          </TabsTrigger>
          <TabsTrigger value="server-health" className="text-xs sm:text-sm">
            Server Health
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                Critical Issues
              </CardTitle>
              <CardDescription>
                These issues have the highest impact on your site's performance and should be addressed immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAllCriticalIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-3">High Impact Issues</h3>
                  {getAllHighIssues().map((issue) => renderIssueCard(issue, issue.category, issue.subcategory))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical-seo">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCode className="h-5 w-5 text-blue-500 mr-2" />
                  Technical SEO Score
                </CardTitle>
                <CardDescription>Overall assessment of crawlability, indexability, and renderability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div
                    className={`text-3xl md:text-4xl font-bold ${getScoreColor(technicalIssuesData.technicalSEO.score)}`}
                  >
                    {technicalIssuesData.technicalSEO.score}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                  <Progress
                    value={technicalIssuesData.technicalSEO.score}
                    className="h-2 w-full mt-2 bg-gray-200"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Crawlability</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Critical Issues</div>
                        <div className="text-xs text-gray-500">
                          {
                            technicalIssuesData.technicalSEO.crawlability.issues.filter((i) => i.impact === "critical")
                              .length
                          }{" "}
                          issues detected
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Indexability</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Critical Issues</div>
                        <div className="text-xs text-gray-500">
                          {
                            technicalIssuesData.technicalSEO.indexability.issues.filter((i) => i.impact === "critical")
                              .length
                          }{" "}
                          issues detected
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Renderability</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">High Impact Issues</div>
                        <div className="text-xs text-gray-500">
                          {
                            technicalIssuesData.technicalSEO.renderability.issues.filter((i) => i.impact === "high")
                              .length
                          }{" "}
                          issues detected
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Technical SEO Issues</CardTitle>
                <CardDescription>
                  Issues affecting how search engines crawl, index, and render your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Globe className="h-5 w-5 text-blue-500 mr-2" />
                      Crawlability Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.technicalSEO.crawlability.issues.map((issue) =>
                        renderIssueCard(issue, "Technical SEO", "Crawlability"),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Search className="h-5 w-5 text-blue-500 mr-2" />
                      Indexability Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.technicalSEO.indexability.issues.map((issue) =>
                        renderIssueCard(issue, "Technical SEO", "Indexability"),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      Renderability Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.technicalSEO.renderability.issues.map((issue) =>
                        renderIssueCard(issue, "Technical SEO", "Renderability"),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="server-health">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 text-blue-500 mr-2" />
                  Server Health Score
                </CardTitle>
                <CardDescription>
                  Overall assessment of server performance, availability, and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div
                    className={`text-3xl md:text-4xl font-bold ${getScoreColor(technicalIssuesData.serverHealth.score)}`}
                  >
                    {technicalIssuesData.serverHealth.score}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                  <Progress
                    value={technicalIssuesData.serverHealth.score}
                    className="h-2 w-full mt-2 bg-gray-200"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Performance</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Critical Issues</div>
                        <div className="text-xs text-gray-500">
                          {
                            technicalIssuesData.serverHealth.performance.issues.filter((i) => i.impact === "critical")
                              .length
                          }{" "}
                          issues detected
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Availability</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Critical Issues</div>
                        <div className="text-xs text-gray-500">
                          {
                            technicalIssuesData.serverHealth.availability.issues.filter((i) => i.impact === "critical")
                              .length
                          }{" "}
                          issues detected
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Configuration</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">High Impact Issues</div>
                        <div className="text-xs text-gray-500">
                          {
                            technicalIssuesData.serverHealth.configuration.issues.filter((i) => i.impact === "high")
                              .length
                          }{" "}
                          issues detected
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Server Health Issues</CardTitle>
                <CardDescription>
                  Issues affecting your server's performance, availability, and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      Performance Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.serverHealth.performance.issues.map((issue) =>
                        renderIssueCard(issue, "Server Health", "Performance"),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Server className="h-5 w-5 text-blue-500 mr-2" />
                      Availability Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.serverHealth.availability.issues.map((issue) =>
                        renderIssueCard(issue, "Server Health", "Availability"),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <FileCode className="h-5 w-5 text-blue-500 mr-2" />
                      Configuration Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.serverHealth.configuration.issues.map((issue) =>
                        renderIssueCard(issue, "Server Health", "Configuration"),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  Security Score
                </CardTitle>
                <CardDescription>Overall assessment of SSL/TLS and DNS security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div
                    className={`text-3xl md:text-4xl font-bold ${getScoreColor(technicalIssuesData.security.score)}`}
                  >
                    {technicalIssuesData.security.score}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                  <Progress
                    value={technicalIssuesData.security.score}
                    className="h-2 w-full mt-2 bg-gray-200"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">SSL/TLS</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Critical Issues</div>
                        <div className="text-xs text-gray-500">
                          {technicalIssuesData.security.ssl.issues.filter((i) => i.impact === "critical").length} issues
                          detected
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">DNS</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        <Info className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Medium Impact Issues</div>
                        <div className="text-xs text-gray-500">
                          {technicalIssuesData.security.dns.issues.filter((i) => i.impact === "medium").length} issues
                          detected
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Security Issues</CardTitle>
                <CardDescription>Issues affecting your site's SSL/TLS and DNS security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Lock className="h-5 w-5 text-blue-500 mr-2" />
                      SSL/TLS Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.security.ssl.issues.map((issue) =>
                        renderIssueCard(issue, "Security", "SSL/TLS"),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Globe className="h-5 w-5 text-blue-500 mr-2" />
                      DNS Issues
                    </h3>
                    <div className="space-y-4">
                      {technicalIssuesData.security.dns.issues.map((issue) =>
                        renderIssueCard(issue, "Security", "DNS"),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

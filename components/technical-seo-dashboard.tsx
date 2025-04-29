"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, ChevronDown, Globe, Info, FileSearch, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SEOIssueCard } from "./seo-issue-card"
import { Progress } from "@/components/ui/progress"

// Sample data structure based on what we can actually retrieve from Lighthouse and Puppeteer
const technicalSeoData = {
  overallScore: 68,

  coreWebVitals: {
    score: 62,
    issues: [
      {
        id: "lcp-slow",
        title: "Slow Largest Contentful Paint (LCP)",
        description: "LCP is 4.2s, which is slower than the recommended 2.5s.",
        impact: "critical",
        detectionMethod: "Lighthouse performance metrics",
        recommendation: "Optimize images, reduce JavaScript, and improve server response time.",
        metrics: [{ name: "LCP", value: "4.2s", target: "2.5s", status: "fail" }],
        affectedUrls: ["/products (4.8s)", "/blog (4.5s)", "/home (3.9)"],
      },
      {
        id: "cls-high",
        title: "High Cumulative Layout Shift (CLS)",
        description: "CLS is 0.28, which is higher than the recommended 0.1.",
        impact: "high",
        detectionMethod: "Lighthouse performance metrics",
        recommendation: "Set dimensions for images and embeds, avoid inserting content above existing content.",
        metrics: [{ name: "CLS", value: "0.28", target: "0.1", status: "fail" }],
        affectedUrls: ["/blog (0.35)", "/products (0.29)"],
      },
      {
        id: "fid-slow",
        title: "Slow First Input Delay (FID)",
        description: "FID is 180ms, which is slower than the recommended 100ms.",
        impact: "high",
        detectionMethod: "Lighthouse performance metrics",
        recommendation: "Reduce JavaScript execution time, break up long tasks, optimize event handlers.",
        metrics: [{ name: "FID", value: "180ms", target: "100ms", status: "fail" }],
      },
    ],
  },

  crawlability: {
    score: 72,
    issues: [
      {
        id: "robots-blocked",
        title: "Critical pages blocked by robots.txt",
        description:
          "3 important pages are blocked by your robots.txt file, preventing search engines from indexing them.",
        impact: "critical",
        affectedUrls: ["/products/category/electronics", "/blog/seo-tips", "/services/web-design"],
        detectionMethod: "Puppeteer robots.txt analysis",
        recommendation: "Update your robots.txt file to allow crawling of these important pages.",
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
        detectionMethod: "Puppeteer crawl",
        recommendation: "Fix or remove these broken links to improve user experience and crawlability.",
      },
    ],
  },

  indexability: {
    score: 65,
    issues: [
      {
        id: "noindex-important",
        title: "Unintentional noindex directives",
        description: "2 important pages have noindex directives, preventing them from appearing in search results.",
        impact: "critical",
        affectedUrls: ["/products (meta robots: noindex)", "/contact-us (X-Robots-Tag: noindex)"],
        detectionMethod: "Puppeteer meta robots scan",
        recommendation: "Remove the noindex directives from these important pages.",
      },
      {
        id: "duplicate-content",
        title: "Duplicate content issues",
        description: "4 pages have substantially similar content without proper canonicalization.",
        impact: "medium",
        affectedUrls: ["/products?sort=price", "/products?view=grid", "/products?category=all", "/products"],
        detectionMethod: "Puppeteer content comparison",
        recommendation: "Implement canonical tags to indicate the preferred version of these pages.",
      },
    ],
  },

  mobileFriendliness: {
    score: 78,
    issues: [
      {
        id: "viewport-not-set",
        title: "Viewport not set",
        description: "The viewport meta tag is missing on some pages, causing mobile rendering issues.",
        impact: "high",
        affectedUrls: ["/about", "/contact", "/legacy-page"],
        detectionMethod: "Lighthouse mobile-friendly test",
        recommendation: "Add a proper viewport meta tag to all pages.",
      },
      {
        id: "touch-elements-too-close",
        title: "Touch elements too close together",
        description: "5 pages have touch elements that are too close together on mobile devices.",
        impact: "medium",
        affectedUrls: [
          "/products (touch elements too close)",
          "/blog (touch elements too close)",
          "/menu (touch elements too close)",
        ],
        detectionMethod: "Lighthouse mobile-friendly test",
        recommendation: "Ensure proper spacing between touch elements on mobile devices.",
      },
    ],
  },

  bestPractices: {
    score: 70,
    issues: [
      {
        id: "missing-meta-descriptions",
        title: "Missing meta descriptions",
        description: "12 pages are missing meta descriptions, which are important for search result snippets.",
        impact: "medium",
        detectionMethod: "Lighthouse SEO audit",
        recommendation: "Add unique, descriptive meta descriptions to all pages.",
      },
      {
        id: "missing-alt-text",
        title: "Images missing alt text",
        description: "23 images are missing alt text, which is important for accessibility and SEO.",
        impact: "medium",
        detectionMethod: "Lighthouse accessibility audit",
        recommendation: "Add descriptive alt text to all images.",
      },
      {
        id: "render-blocking-resources",
        title: "Render-blocking resources",
        description: "7 JavaScript and CSS files are blocking the rendering of your pages.",
        impact: "high",
        detectionMethod: "Lighthouse performance audit",
        recommendation: "Defer non-critical JavaScript and inline critical CSS.",
      },
    ],
  },
}

export function TechnicalSeoDashboard() {
  // Sample data
  const technicalSEOIssues = [
    {
      id: 1,
      title: "Missing Meta Descriptions",
      description: "15 pages are missing meta descriptions.",
      severity: "critical",
      affectedPages: ["/products", "/about", "/contact"],
      recommendation: "Add unique, descriptive meta descriptions to each page.",
      source: "Lighthouse",
      isPageLevel: true,
      simpleExplanation:
        "Without meta descriptions, search engines may display random text from your page in search results, reducing click-through rates.",
    },
    {
      id: 2,
      title: "Slow Page Load Speed",
      description: "Average page load time is 5.2 seconds.",
      severity: "critical",
      recommendation: "Optimize images, enable compression, and minimize JavaScript.",
      source: "Lighthouse",
      isPageLevel: false,
      simpleExplanation:
        "Slow pages frustrate users and are ranked lower by Google, resulting in less traffic to your site.",
    },
    {
      id: 3,
      title: "Missing Alt Text for Images",
      description: "42 images are missing alt text.",
      severity: "warning",
      affectedPages: ["/gallery", "/products/featured"],
      recommendation: "Add descriptive alt text to all images.",
      source: "Puppeteer",
      isPageLevel: true,
      simpleExplanation:
        "Without alt text, search engines can't understand your images, and you miss opportunities to rank in image search results.",
    },
    {
      id: 4,
      title: "Broken Internal Links",
      description: "8 internal links are broken.",
      severity: "warning",
      affectedPages: ["/resources", "/blog/old-post"],
      recommendation: "Fix or remove broken links.",
      source: "Puppeteer",
      isPageLevel: true,
      simpleExplanation:
        "Broken links frustrate users and waste your site's 'crawl budget,' meaning search engines might miss important pages.",
    },
    {
      id: 5,
      title: "Missing Canonical Tags",
      description: "12 pages are missing canonical tags.",
      severity: "moderate",
      recommendation: "Add canonical tags to prevent duplicate content issues.",
      source: "Lighthouse",
      isPageLevel: true,
      simpleExplanation:
        "Without canonical tags, search engines might see multiple versions of the same page as duplicate content, diluting your ranking power.",
    },
  ]

  // Filter issues by severity
  const criticalIssues = technicalSEOIssues.filter((issue) => issue.severity === "critical")
  const warningIssues = technicalSEOIssues.filter((issue) => issue.severity === "warning")
  const moderateIssues = technicalSEOIssues.filter((issue) => issue.severity === "moderate")
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
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
      default:
        return null
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

    // Core Web Vitals
    technicalSeoData.coreWebVitals.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Core Web Vitals", subcategory: "Performance" }))

    // Crawlability
    technicalSeoData.crawlability.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Crawlability", subcategory: "Robots" }))

    // Indexability
    technicalSeoData.indexability.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Indexability", subcategory: "Meta Tags" }))

    // Mobile Friendliness
    technicalSeoData.mobileFriendliness.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Mobile Friendliness", subcategory: "Viewport" }))

    // Best Practices
    technicalSeoData.bestPractices.issues
      .filter((issue) => issue.impact === "critical")
      .forEach((issue) => issues.push({ ...issue, category: "Best Practices", subcategory: "SEO" }))

    return issues
  }

  // Get all high impact issues across all categories
  const getAllHighIssues = () => {
    const issues: any[] = []

    // Core Web Vitals
    technicalSeoData.coreWebVitals.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Core Web Vitals", subcategory: "Performance" }))

    // Crawlability
    technicalSeoData.crawlability.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Crawlability", subcategory: "Robots" }))

    // Indexability
    technicalSeoData.indexability.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Indexability", subcategory: "Meta Tags" }))

    // Mobile Friendliness
    technicalSeoData.mobileFriendliness.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Mobile Friendliness", subcategory: "Viewport" }))

    // Best Practices
    technicalSeoData.bestPractices.issues
      .filter((issue) => issue.impact === "high")
      .forEach((issue) => issues.push({ ...issue, category: "Best Practices", subcategory: "SEO" }))

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
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technical SEO Score</CardTitle>
            <FileSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68/100</div>
            <Progress
              value={68}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42/45</div>
            <Progress
              value={42}
              max={45}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crawled Pages</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <Progress
              value={45}
              max={45}
              className="h-2 mt-2 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
            />
            <p className="text-xs text-muted-foreground">No change from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            Critical SEO Issues
          </CardTitle>
          <CardDescription>
            These issues have the highest impact on your search engine rankings and should be addressed immediately
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="grid gap-4">
            {criticalIssues.map((issue) => (
              <SEOIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Issues</CardTitle>
              <CardDescription>A comprehensive list of SEO issues found on your website.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {technicalSEOIssues.map((issue) => (
                  <SEOIssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Results</CardTitle>
              <CardDescription>Detailed results from the latest SEO audit.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you could display the raw audit data or a summary of the audit process.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

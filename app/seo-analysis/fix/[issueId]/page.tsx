"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, HelpCircle, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Sample SEO issues data
const seoIssues = {
  "1": {
    id: 1,
    title: "Missing Meta Descriptions",
    description: "15 pages are missing meta descriptions.",
    severity: "critical",
    affectedPages: ["/products", "/about", "/contact"],
    recommendation: "Add unique, descriptive meta descriptions to each page.",
    source: "Lighthouse",
    detectionDate: "May 10, 2023",
    simpleExplanation:
      "Without meta descriptions, search engines may display random text from your page in search results, reducing click-through rates.",
    technicalDetails: `Meta descriptions are HTML attributes that provide concise summaries of web pages. They appear in search engine results pages (SERPs) below the title tag and URL of a page.

Google typically truncates meta descriptions at around 155-160 characters on desktop and 120 characters on mobile devices.

Our scan detected 15 pages without meta descriptions, which means Google will automatically generate snippets from your page content, which may not align with your marketing goals.`,
    steps: [
      {
        title: "Identify affected pages",
        description: "Review the list of pages missing meta descriptions",
        estimatedTime: "5 minutes",
        technicalDetails:
          "Use the list provided in the report or check Google Search Console for pages with missing meta descriptions.",
      },
      {
        title: "Create unique meta descriptions",
        description: "Write compelling, unique descriptions for each page",
        estimatedTime: "30 minutes",
        technicalDetails:
          "Each meta description should be under 155 characters, include relevant keywords, and accurately summarize the page content.",
      },
      {
        title: "Implement meta descriptions",
        description: "Add the meta descriptions to your website's HTML",
        estimatedTime: "15 minutes",
        technicalDetails:
          'Add <meta name="description" content="Your description here"> in the <head> section of each page.',
      },
      {
        title: "Verify implementation",
        description: "Check that meta descriptions are properly implemented",
        estimatedTime: "10 minutes",
        technicalDetails:
          "Use browser developer tools or online SEO tools to verify that meta descriptions are correctly implemented on all pages.",
      },
    ],
    nonTechnicalSteps: [
      "Look at the list of pages that need descriptions (like your About and Contact pages)",
      "For each page, write a short summary (1-2 sentences) that describes what's on that page",
      "Make sure each description includes words people might search for",
      "Ask your web developer to add these descriptions to your website",
      "After a week, check if your pages show up better in Google searches",
    ],
  },
  "2": {
    id: 2,
    title: "Slow Page Load Speed",
    description: "Average page load time is 5.2 seconds.",
    severity: "critical",
    recommendation: "Optimize images, enable compression, and minimize JavaScript.",
    source: "Lighthouse",
    detectionDate: "May 8, 2023",
    simpleExplanation:
      "Slow pages frustrate users and are ranked lower by Google, resulting in less traffic to your site.",
    technicalDetails: `Page speed is a critical ranking factor for search engines and directly impacts user experience. Google recommends a page load time of under 2 seconds.

Our performance audit shows your site's average load time is 5.2 seconds, which is significantly higher than the recommended threshold.

The main contributors to slow load times are:
- Unoptimized images (contributing ~40% of page weight)
- Render-blocking JavaScript (delaying content visibility)
- Lack of browser caching (forcing repeat downloads)
- Uncompressed resources (increasing transfer time)`,
    steps: [
      {
        title: "Optimize images",
        description: "Compress and resize images to appropriate dimensions",
        estimatedTime: "45 minutes",
        technicalDetails:
          "Use tools like ImageOptim, TinyPNG, or Squoosh to compress images without significant quality loss. Implement responsive images using srcset and size attributes.",
      },
      {
        title: "Enable GZIP compression",
        description: "Configure server to compress text-based resources",
        estimatedTime: "15 minutes",
        technicalDetails:
          "Add appropriate compression directives to your server configuration (e.g., .htaccess for Apache or nginx.conf for Nginx).",
      },
      {
        title: "Minimize render-blocking resources",
        description: "Defer non-critical JavaScript and CSS",
        estimatedTime: "60 minutes",
        technicalDetails:
          "Use async or defer attributes for non-critical scripts. Consider inlining critical CSS and loading non-critical CSS asynchronously.",
      },
      {
        title: "Implement browser caching",
        description: "Set appropriate cache headers for static resources",
        estimatedTime: "20 minutes",
        technicalDetails:
          "Configure Cache-Control and Expires headers to specify how long browsers should cache resources.",
      },
    ],
    nonTechnicalSteps: [
      "Make your images smaller (like shrinking a photo before sending it in an email)",
      "Ask your developer to turn on website compression (like zipping files to make them download faster)",
      "Remove unnecessary features or plugins that slow down your site",
      "Consider upgrading your hosting plan for better performance",
      "After changes are made, test your website on different devices to make sure it loads quickly",
    ],
  },
}

export default function FixSeoIssuePage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")
  const issueId = params.issueId
  const issue = seoIssues[issueId as keyof typeof seoIssues]

  if (!issue) {
    return (
      <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
        <div className="flex items-center mb-6">
          <Link href="/seo-analysis">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to SEO Analysis
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#323048]">Issue Not Found</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>The requested SEO issue could not be found. Please return to the SEO Analysis dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex items-center mb-6">
        <Link href="/seo-analysis">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to SEO Analysis
          </Button>
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#323048]">{issue.title}</h1>
          <div className="text-xs sm:text-sm text-[#7D8496] mt-1">
            Detected on {issue.detectionDate} • Issue ID: {issue.id}
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Suggested Fix Plan</CardTitle>
          <CardDescription>
            Follow these recommendations to resolve the SEO issue and improve your search rankings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">This is a recommendation plan</p>
                <p className="text-sm text-amber-700 mt-1">
                  These steps outline how to fix this issue but won't be implemented automatically. You'll need to make
                  these changes manually or with your development team.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="non-technical" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="non-technical">Non-Technical Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
            </TabsList>

            <TabsContent value="non-technical">
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium mb-2">In Simple Terms</h3>
                  <p className="text-sm text-gray-700">{issue.simpleExplanation}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Steps to Fix This Issue:</h3>
                  <div className="space-y-4">
                    {issue.nonTechnicalSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#537AEF] text-white flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <div className="text-sm">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium mb-2">Good to Know</h3>
                  <p className="text-sm text-gray-700">
                    Fixing this issue typically takes about{" "}
                    {issue.steps.reduce((total, step) => {
                      const minutes = Number.parseInt(step.estimatedTime.split(" ")[0])
                      return total + minutes
                    }, 0)}{" "}
                    minutes of work. The benefits will be visible in search results within 1-2 weeks as search engines
                    recrawl your site.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="technical">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Issue Details</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{issue.technicalDetails}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Implementation Steps:</h3>
                  <div className="space-y-4">
                    {issue.steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#537AEF] text-white flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{step.title}</h4>
                              <p className="text-sm text-gray-700 mt-1">{step.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {step.estimatedTime}
                          </div>
                        </div>
                        <div className="mt-3 pl-9">
                          <p className="text-sm text-gray-700">{step.technicalDetails}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium mb-2">Manual Implementation Notes</h3>
                  <p className="text-sm text-gray-700">
                    These changes should be implemented by someone with access to your website's code or content
                    management system. After implementation, we recommend running another SEO scan to verify the issue
                    has been resolved.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="h-4 w-4 mr-1" />
              Print Steps
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Share2 className="h-4 w-4 mr-1" />
              Forward to IT Team
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <X className="h-4 w-4 mr-1" />
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

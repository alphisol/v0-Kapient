"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, BarChart, Send, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WebsiteTrafficFixPage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")

  // This would be fetched from an API in a real implementation
  const issue = {
    id: params.issueId,
    title: "High Bounce Rate on Landing Pages",
    description:
      "Your website's landing pages have an average bounce rate of 78%, which is significantly higher than the industry average of 55%.",
    severity: "high",
    detectedDate: "May 9, 2023",
    recommendation: "Optimize your landing pages to reduce bounce rate and improve user engagement.",
    simpleExplanation:
      "A high bounce rate means visitors are leaving your site quickly after viewing just one page. This suggests they aren't finding what they're looking for or the page isn't engaging enough to encourage further exploration.",
    technicalDetails:
      "Analysis of your Google Analytics data shows that landing pages have a 78% bounce rate compared to the industry average of 55%. The average time on page is 28 seconds, indicating users aren't engaging with your content. Mobile bounce rates are particularly high at 85%.",
    estimatedTime: "1-2 weeks",
    steps: [
      {
        title: "Analyze user behavior",
        description: "Use analytics tools to understand how users are interacting with your landing pages.",
        technicalDescription:
          "Review heatmaps, session recordings, and user flow reports to identify where users are dropping off. Look for patterns in exit points and user confusion points.",
        estimatedTime: "2-3 hours",
      },
      {
        title: "Improve page load speed",
        description: "Optimize your landing pages to load faster, especially on mobile devices.",
        technicalDescription:
          "Compress images, minimize CSS/JS, implement lazy loading, and leverage browser caching. Aim for a page load time under 3 seconds on all devices.",
        estimatedTime: "4-8 hours",
      },
      {
        title: "Enhance content relevance",
        description: "Ensure your landing page content matches user expectations from incoming traffic sources.",
        technicalDescription:
          "Align landing page messaging with ad copy and search keywords. Create dedicated landing pages for different traffic sources with tailored content that addresses specific user intents.",
        estimatedTime: "8-16 hours",
      },
      {
        title: "Improve call-to-action (CTA)",
        description: "Make your CTAs more compelling and visible to guide users to the next step.",
        technicalDescription:
          "Test different CTA placements, colors, sizes, and copy. Ensure CTAs are above the fold on all devices and clearly communicate the value proposition.",
        estimatedTime: "4-6 hours",
      },
      {
        title: "Implement A/B testing",
        description: "Test different versions of your landing pages to see which performs better.",
        technicalDescription:
          "Set up A/B tests for key elements like headlines, images, CTAs, and layout. Use statistical significance to determine winners and implement changes based on data.",
        estimatedTime: "Ongoing (2-4 weeks)",
      },
    ],
    affectedPages: [
      {
        url: "/home",
        bounceRate: "82%",
        avgTimeOnPage: "22 seconds",
        exitRate: "65%",
      },
      {
        url: "/products",
        bounceRate: "75%",
        avgTimeOnPage: "35 seconds",
        exitRate: "58%",
      },
      {
        url: "/services",
        bounceRate: "79%",
        avgTimeOnPage: "28 seconds",
        exitRate: "61%",
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/website-traffic">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Fix: {issue.title}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Issue detected on {issue.detectedDate} • ID: {issue.id}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Suggested Fix Plan</CardTitle>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Estimated time: {issue.estimatedTime}
            </div>
          </div>
          <CardDescription>
            This plan outlines the recommended steps to fix the {issue.title.toLowerCase()} issue. These are suggestions
            and may need to be adapted to your specific website and business goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <BarChart className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Recommendation Only</h3>
                <p className="text-amber-700 text-sm">
                  This is a suggested plan of action. These changes need to be implemented by your web development and
                  marketing teams.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="non-technical" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="non-technical">Non-Technical Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
            </TabsList>

            <TabsContent value="non-technical" className="space-y-4 pt-4">
              <div className="bg-white border rounded-md p-4 shadow-sm">
                <h3 className="font-medium text-lg mb-2">In Simple Terms</h3>
                <p className="text-gray-700">{issue.simpleExplanation}</p>
              </div>

              <h3 className="font-medium text-lg">What You Need To Do</h3>
              <ol className="space-y-4">
                {issue.steps.map((step, index) => (
                  <li key={index} className="border rounded-md p-4 bg-white shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Estimated time: {step.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-gray-50 border rounded-md p-4 mt-6">
                <h3 className="font-medium mb-2">Good to know</h3>
                <p className="text-gray-600 text-sm">
                  Reducing bounce rate is an ongoing process that requires continuous testing and optimization. Even
                  small improvements can significantly impact your conversion rates and overall business results.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 pt-4">
              <div className="bg-gray-50 border rounded-md p-4">
                <h3 className="font-medium mb-2">Technical Background</h3>
                <p className="text-gray-700">{issue.technicalDetails}</p>
              </div>

              <h3 className="font-medium text-lg">Affected Pages</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Page URL
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bounce Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Avg. Time on Page
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Exit Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {issue.affectedPages.map((page, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.url}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                          {page.bounceRate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.avgTimeOnPage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.exitRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-medium text-lg mt-6">Implementation Steps</h3>
              <ol className="space-y-4">
                {issue.steps.map((step, index) => (
                  <li key={index} className="border rounded-md p-4 bg-white shadow-sm">
                    <div>
                      <h4 className="font-medium">
                        {index + 1}. {step.title}
                      </h4>
                      <p className="text-gray-700 mt-1">{step.technicalDescription}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Estimated time: {step.estimatedTime}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-gray-50 border rounded-md p-4 mt-6">
                <h3 className="font-medium mb-2">Implementation Notes</h3>
                <p className="text-gray-600 text-sm">
                  Prioritize changes based on potential impact and implementation difficulty. Start with quick wins like
                  page speed optimization and CTA improvements, then move to more complex content and layout changes.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3 mt-8 justify-end">
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Print steps
            </Button>
            <Button variant="outline" className="flex items-center">
              <Send className="h-4 w-4 mr-2" />
              Forward to marketing team
            </Button>
            <Button variant="outline" className="flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

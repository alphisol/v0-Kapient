"use client"

import { BarChart, FileText, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample content data
const contentData = {
  totalPages: 42,
  analyzedPages: 38,
  contentScore: 76,
  wordCount: {
    average: 1250,
    recommended: 1500,
  },
  readability: {
    score: 68,
    level: "Standard",
    recommended: "Standard",
  },
  contentIssues: [
    {
      type: "warning",
      count: 12,
      description: "Pages with thin content (less than 500 words)",
    },
    {
      type: "warning",
      count: 8,
      description: "Pages with no internal links",
    },
    {
      type: "error",
      count: 5,
      description: "Pages with duplicate content",
    },
    {
      type: "info",
      count: 15,
      description: "Pages missing meta descriptions",
    },
    {
      type: "success",
      count: 22,
      description: "Pages with optimal content length",
    },
  ],
  topPerformingPages: [
    {
      title: "Ultimate Guide to SEO",
      url: "/blog/ultimate-guide-to-seo",
      score: 92,
    },
    {
      title: "How to Improve Website Performance",
      url: "/blog/improve-website-performance",
      score: 88,
    },
    {
      title: "10 SEO Mistakes to Avoid",
      url: "/blog/seo-mistakes-to-avoid",
      score: 85,
    },
  ],
}

export function ContentAnalysis() {
  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Content Overview</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Analysis of your website's content quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium">Content Score</span>
                <span className={`text-base sm:text-lg font-bold ${getScoreColor(contentData.contentScore)}`}>
                  {contentData.contentScore}/100
                </span>
              </div>
              <Progress
                value={contentData.contentScore}
                className={`h-1.5 sm:h-2 ${getProgressColor(contentData.contentScore)}`}
              />
              <p className="text-[10px] xs:text-xs text-gray-500 mt-1">
                {contentData.contentScore >= 80
                  ? "Good - Your content is well-optimized"
                  : contentData.contentScore >= 60
                    ? "Average - Your content needs some improvements"
                    : "Poor - Your content needs significant improvements"}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs sm:text-sm font-medium mb-2">Content Statistics</div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <div className="text-[10px] xs:text-xs text-gray-500">Total Pages</div>
                  <div className="text-base sm:text-lg font-medium">{contentData.totalPages}</div>
                </div>
                <div>
                  <div className="text-[10px] xs:text-xs text-gray-500">Analyzed Pages</div>
                  <div className="text-base sm:text-lg font-medium">{contentData.analyzedPages}</div>
                </div>
                <div>
                  <div className="text-[10px] xs:text-xs text-gray-500">Avg. Word Count</div>
                  <div className="text-base sm:text-lg font-medium">
                    {contentData.wordCount.average}
                    <span className="text-[10px] xs:text-xs text-gray-500 ml-1">
                      / {contentData.wordCount.recommended} recommended
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] xs:text-xs text-gray-500">Readability</div>
                  <div className="text-base sm:text-lg font-medium">
                    {contentData.readability.level}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 text-gray-400 inline" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Readability score: {contentData.readability.score}/100. Recommended level:{" "}
                            {contentData.readability.recommended}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Button variant="outline" className="w-full text-xs sm:text-sm">
                <BarChart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                View Content Audit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Content Issues</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Issues detected in your website content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {contentData.contentIssues.map((issue, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-2 sm:mr-3 mt-0.5">{getIssueIcon(issue.type)}</div>
                <div>
                  <div className="font-medium text-xs sm:text-sm">{issue.count} pages</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600">{issue.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Top Performing Content</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Your best content based on SEO score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {contentData.topPerformingPages.map((page, index) => (
              <div
                key={index}
                className="flex items-start pb-3 sm:pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="mr-2 sm:mr-3 mt-0.5">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs sm:text-sm truncate">{page.title}</div>
                  <div className="text-[10px] xs:text-xs text-gray-500 truncate">{page.url}</div>
                  <div className="mt-1 flex items-center">
                    <span className={`text-[10px] xs:text-xs sm:text-sm font-medium ${getScoreColor(page.score)}`}>
                      {page.score}/100
                    </span>
                    <Progress
                      value={page.score}
                      className={`h-1 sm:h-1.5 w-12 sm:w-16 ml-2 ${getProgressColor(page.score)}`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2 text-xs sm:text-sm">
              View All Pages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

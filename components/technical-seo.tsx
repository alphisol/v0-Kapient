"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  FileCode,
  HelpCircle,
  Info,
  Smartphone,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

// Sample technical SEO data
const technicalSeoData = {
  score: 72,
  issues: {
    critical: 3,
    warnings: 8,
    passed: 24,
    info: 5,
  },
  categories: [
    {
      name: "Page Speed",
      score: 68,
      issues: [
        {
          type: "warning",
          title: "Slow First Contentful Paint (FCP)",
          description: "First Contentful Paint is 2.8s, which is slower than the recommended 1.8s.",
          impact: "medium",
          fixInstructions:
            "Optimize critical rendering path, reduce server response time, and minimize render-blocking resources.",
        },
        {
          type: "warning",
          title: "Optimize Images",
          description: "5 images are not properly sized or compressed.",
          impact: "medium",
          fixInstructions: "Resize images to their display size and use WebP format where possible.",
        },
        {
          type: "success",
          title: "Good Time to Interactive (TTI)",
          description: "Time to Interactive is 3.2s, which is within the recommended range.",
          impact: "high",
        },
      ],
    },
    {
      name: "Mobile Usability",
      score: 85,
      issues: [
        {
          type: "success",
          title: "Viewport Properly Configured",
          description: "The viewport is properly configured for mobile devices.",
          impact: "high",
        },
        {
          type: "warning",
          title: "Touch Elements Too Close",
          description: "Some touch elements are too close together on mobile.",
          impact: "medium",
          fixInstructions: "Ensure touch elements have at least 8px spacing between them.",
        },
      ],
    },
    {
      name: "Indexability",
      score: 62,
      issues: [
        {
          type: "critical",
          title: "Noindex Tag Found",
          description: "Noindex tag found on 2 important pages that should be indexed.",
          impact: "high",
          fixInstructions: "Remove the noindex meta tag from these pages if they should be indexed by search engines.",
        },
        {
          type: "warning",
          title: "Canonical URL Issues",
          description: "3 pages have missing or incorrect canonical URLs.",
          impact: "medium",
          fixInstructions: "Add or correct canonical URLs to prevent duplicate content issues.",
        },
        {
          type: "info",
          title: "Robots.txt Configuration",
          description: "Your robots.txt file is properly configured but could be optimized.",
          impact: "low",
          fixInstructions: "Consider adding specific directives for different user agents.",
        },
      ],
    },
    {
      name: "Structured Data",
      score: 70,
      issues: [
        {
          type: "warning",
          title: "Incomplete Schema Markup",
          description: "Schema markup is missing recommended properties on 4 pages.",
          impact: "medium",
          fixInstructions: "Add all recommended properties to your schema markup for better rich results.",
        },
        {
          type: "success",
          title: "Valid Schema Format",
          description: "All schema markup is in valid JSON-LD format.",
          impact: "medium",
        },
      ],
    },
  ],
}

export function TechnicalSeo() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category))
    } else {
      setExpandedCategories([...expandedCategories, category])
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />
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

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Impact</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low Impact</Badge>
      default:
        return null
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Technical SEO Score</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Overall technical health of your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${getScoreColor(technicalSeoData.score)}`}>
                {technicalSeoData.score}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">out of 100</div>
              <Progress
                value={technicalSeoData.score}
                className={`h-2 w-full mt-2 ${getProgressColor(technicalSeoData.score)}`}
              />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs sm:text-sm font-medium mb-2">Issues Summary</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 sm:mr-3">
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Critical</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">{technicalSeoData.issues.critical}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2 sm:mr-3">
                      <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Warnings</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">{technicalSeoData.issues.warnings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 sm:mr-3">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Passed</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">{technicalSeoData.issues.passed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3">
                      <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Info</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">{technicalSeoData.issues.info}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Button variant="outline" className="w-full text-xs sm:text-sm">
                <FileCode className="mr-2 h-4 w-4" />
                Export Technical Audit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Technical SEO Issues</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Detailed analysis of technical SEO factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalSeoData.categories.map((category) => (
              <Collapsible
                key={category.name}
                open={expandedCategories.includes(category.name)}
                onOpenChange={() => toggleCategory(category.name)}
                className="border rounded-md"
              >
                <div className="p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {category.name === "Page Speed" && <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />}
                    {category.name === "Mobile Usability" && (
                      <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                    )}
                    {category.name === "Indexability" && (
                      <FileCode className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                    )}
                    {category.name === "Structured Data" && (
                      <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                    )}
                    <div>
                      <div className="font-medium text-xs sm:text-sm">{category.name}</div>
                      <div className="flex items-center">
                        <span className={`text-xs ${getScoreColor(category.score)}`}>{category.score}/100</span>
                        <Progress
                          value={category.score}
                          className={`h-1 sm:h-1.5 w-12 sm:w-16 ml-2 ${getProgressColor(category.score)}`}
                        />
                      </div>
                    </div>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {expandedCategories.includes(category.name) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                    {category.issues.map((issue, index) => (
                      <div key={index} className="border rounded-md p-2 sm:p-3">
                        <div className="flex items-start">
                          <div className="mr-2 sm:mr-3 mt-0.5">{getIssueIcon(issue.type)}</div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                              <span className="font-medium text-xs sm:text-sm">{issue.title}</span>
                              {issue.impact && getImpactBadge(issue.impact)}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">{issue.description}</p>
                            {issue.fixInstructions && (
                              <div className="bg-gray-50 p-2 sm:p-3 rounded-md text-xs sm:text-sm">
                                <div className="font-medium mb-1">How to fix:</div>
                                <p className="text-gray-600">{issue.fixInstructions}</p>
                              </div>
                            )}
                          </div>
                          {issue.type !== "success" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="ml-1 sm:ml-2">
                                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs text-xs">Learn more about this issue and how to fix it</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

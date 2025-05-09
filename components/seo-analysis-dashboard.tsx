"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, BarChart3, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { SEOIssueCard } from "@/components/seo-issue-card"
import { TechnicalSeo } from "@/components/technical-seo"
import { KeywordAnalysis } from "@/components/keyword-analysis"
import { ContentAnalysis } from "@/components/content-analysis"
import { BacklinkAnalysis } from "@/components/backlink-analysis"
import { getScoreColor } from "@/lib/color-utils"

// Export both casing versions to fix the error
export const SeoAnalysisDashboard = SEOAnalysisDashboard

export function SEOAnalysisDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample SEO data
  const seoData = {
    overallScore: 68,
    keywordScore: 72,
    contentScore: 65,
    technicalScore: 62,
    backlinkScore: 74,
    criticalIssues: 5,
    warnings: 12,
    improvements: 8,
  }

  // Sample technical SEO issues
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
  ]

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#323048]">SEO Analysis Dashboard</h1>
          <div className="flex items-center text-xs sm:text-sm text-[#7D8496] mt-1">
            <span>Dashboard</span>
            <ArrowRight className="h-3 w-3 mx-2" />
            <span className="text-[#537AEF]">SEO Analysis</span>
          </div>
        </div>
        <Button className="bg-[#537AEF] hover:bg-[#537AEF]/90">
          <Search className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Overall SEO Score</div>
            <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(seoData.overallScore)}`}>
              {seoData.overallScore}/100
            </div>
            <Progress value={seoData.overallScore} className="h-2 mt-2 bg-gray-200" indicatorClassName="bg-[#537AEF]" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Critical Issues</div>
            <div className="text-2xl md:text-3xl font-bold text-[#EC8290]">{seoData.criticalIssues}</div>
            <div className="text-sm text-[#7D8496] mt-2">Require immediate attention</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Warnings</div>
            <div className="text-2xl md:text-3xl font-bold text-[#F8B43B]">{seoData.warnings}</div>
            <div className="text-sm text-[#7D8496] mt-2">Should be addressed soon</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Improvements</div>
            <div className="text-2xl md:text-3xl font-bold text-[#8C57D1]">{seoData.improvements}</div>
            <div className="text-sm text-[#7D8496] mt-2">Opportunities to improve</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 text-[#EC8290] mr-2" />
            Critical SEO Issues
          </CardTitle>
          <CardDescription>
            These issues have the highest impact on your search engine rankings and should be addressed immediately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalSEOIssues
              .filter((issue) => issue.severity === "critical")
              .map((issue) => (
                <SEOIssueCard key={issue.id} issue={issue} />
              ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="technical" className="text-xs sm:text-sm">
            Technical SEO
          </TabsTrigger>
          <TabsTrigger value="keywords" className="text-xs sm:text-sm">
            Keywords
          </TabsTrigger>
          <TabsTrigger value="content" className="text-xs sm:text-sm">
            Content
          </TabsTrigger>
          <TabsTrigger value="backlinks" className="text-xs sm:text-sm">
            Backlinks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Score Breakdown</CardTitle>
                <CardDescription>Analysis of different SEO aspects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Technical SEO</span>
                      <span className={`text-sm font-medium ${getScoreColor(seoData.technicalScore)}`}>
                        {seoData.technicalScore}/100
                      </span>
                    </div>
                    <Progress
                      value={seoData.technicalScore}
                      className="h-2 bg-gray-200"
                      indicatorClassName="bg-[#537AEF]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Keyword Optimization</span>
                      <span className={`text-sm font-medium ${getScoreColor(seoData.keywordScore)}`}>
                        {seoData.keywordScore}/100
                      </span>
                    </div>
                    <Progress
                      value={seoData.keywordScore}
                      className="h-2 bg-gray-200"
                      indicatorClassName="bg-[#537AEF]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Content Quality</span>
                      <span className={`text-sm font-medium ${getScoreColor(seoData.contentScore)}`}>
                        {seoData.contentScore}/100
                      </span>
                    </div>
                    <Progress
                      value={seoData.contentScore}
                      className="h-2 bg-gray-200"
                      indicatorClassName="bg-[#537AEF]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Backlink Profile</span>
                      <span className={`text-sm font-medium ${getScoreColor(seoData.backlinkScore)}`}>
                        {seoData.backlinkScore}/100
                      </span>
                    </div>
                    <Progress
                      value={seoData.backlinkScore}
                      className="h-2 bg-gray-200"
                      indicatorClassName="bg-[#537AEF]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Improvements</CardTitle>
                <CardDescription>SEO changes in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <FileText className="h-5 w-5 text-[#537AEF]" />
                    </div>
                    <div>
                      <div className="font-medium">Meta descriptions added</div>
                      <div className="text-sm text-[#7D8496]">Added to 12 pages</div>
                      <div className="text-xs text-[#7D8496]">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <BarChart3 className="h-5 w-5 text-[#537AEF]" />
                    </div>
                    <div>
                      <div className="font-medium">Page speed improved</div>
                      <div className="text-sm text-[#7D8496]">Average load time reduced by 1.2s</div>
                      <div className="text-xs text-[#7D8496]">1 week ago</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <Search className="h-5 w-5 text-[#537AEF]" />
                    </div>
                    <div>
                      <div className="font-medium">Keyword optimization</div>
                      <div className="text-sm text-[#7D8496]">Updated keywords on 8 pages</div>
                      <div className="text-xs text-[#7D8496]">2 weeks ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <TechnicalSeo />
        </TabsContent>

        <TabsContent value="keywords">
          <KeywordAnalysis />
        </TabsContent>

        <TabsContent value="content">
          <ContentAnalysis />
        </TabsContent>

        <TabsContent value="backlinks">
          <BacklinkAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, FileCode, Globe, Loader2, Search, Server, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getScoreColor } from "@/lib/color-utils"

export function DashboardSummary() {
  const [url, setUrl] = useState("https://example.com")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(true)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulation of analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowAnalysis(true)
    }, 2000)
  }

  // Sample scores
  const scores = {
    overall: 72,
    seo: 68,
    server: 62,
    security: 85,
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#323048]">Website Dashboard</h1>
          <div className="flex items-center text-sm text-[#7D8496] mt-1">
            <span>Dashboard</span>
            <ArrowRight className="h-3 w-3 mx-2" />
            <span className="text-[#537AEF]">Overview</span>
          </div>
        </div>
        <Button onClick={() => setShowAnalysis(false)} className="bg-[#537AEF] hover:bg-[#537AEF]/90">
          New Analysis
        </Button>
      </div>

      {!showAnalysis ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analyze Website</CardTitle>
            <CardDescription>Enter your website URL to analyze all aspects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full md:w-auto bg-[#537AEF] hover:bg-[#537AEF]/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Overall Health</div>
                <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(scores.overall)}`}>
                  {scores.overall}/100
                </div>
                <Progress value={scores.overall} className="h-2 mt-2 bg-gray-200" indicatorClassName="bg-gray-800" />
                <div className="text-sm text-[#7D8496] mt-2">Needs improvement</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">SEO Score</div>
                <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(scores.seo)}`}>{scores.seo}/100</div>
                <Progress value={scores.seo} className="h-2 mt-2 bg-gray-200" indicatorClassName="bg-gray-800" />
                <div className="text-sm text-[#7D8496] mt-2">
                  <Link href="/seo-factors" className="text-[#537AEF] hover:underline">
                    View SEO details
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Server Health</div>
                <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(scores.server)}`}>
                  {scores.server}/100
                </div>
                <Progress value={scores.server} className="h-2 mt-2 bg-gray-200" indicatorClassName="bg-gray-800" />
                <div className="text-sm text-[#7D8496] mt-2">
                  <Link href="/server-health" className="text-[#537AEF] hover:underline">
                    View server details
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Security</div>
                <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(scores.security)}`}>
                  {scores.security}/100
                </div>
                <Progress value={scores.security} className="h-2 mt-2 bg-gray-200" indicatorClassName="bg-gray-800" />
                <div className="text-sm text-[#7D8496] mt-2">Good</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Issues Summary</CardTitle>
                <CardDescription>Overview of detected issues across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md gap-2 border-2 border-[#EC8290]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 border border-[#EC8290]">
                        <Server className="h-4 w-4 text-[#EC8290]" />
                      </div>
                      <div>
                        <div className="font-medium">Server Issues</div>
                        <div className="text-sm text-[#7D8496]">4 critical, 3 warnings</div>
                      </div>
                    </div>
                    <Link href="/server-health">
                      <Button size="sm" variant="outline" className="border-[#EC8290] text-[#EC8290] hover:bg-red-50">
                        View
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md gap-2 border-2 border-[#F8B43B]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 border border-[#F8B43B]">
                        <FileCode className="h-4 w-4 text-[#F8B43B]" />
                      </div>
                      <div>
                        <div className="font-medium">Technical SEO Issues</div>
                        <div className="text-sm text-[#7D8496]">3 critical, 5 warnings</div>
                      </div>
                    </div>
                    <Link href="/technical-seo">
                      <Button size="sm" variant="outline" className="border-[#F8B43B] text-[#F8B43B] hover:bg-amber-50">
                        View
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md gap-2 border-2 border-[#F8B43B]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 border border-[#F8B43B]">
                        <Search className="h-4 w-4 text-[#F8B43B]" />
                      </div>
                      <div>
                        <div className="font-medium">SEO Issues</div>
                        <div className="text-sm text-[#7D8496]">3 critical, 7 warnings</div>
                      </div>
                    </div>
                    <Link href="/seo-factors">
                      <Button size="sm" variant="outline" className="border-[#F8B43B] text-[#F8B43B] hover:bg-amber-50">
                        View
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md gap-2 border-2 border-[#8C57D1]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 border border-[#8C57D1]">
                        <ShieldCheck className="h-4 w-4 text-[#8C57D1]" />
                      </div>
                      <div>
                        <div className="font-medium">Security</div>
                        <div className="text-sm text-[#7D8496]">0 critical, 2 warnings</div>
                      </div>
                    </div>
                    <Link href="/security">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#8C57D1] text-[#8C57D1] hover:bg-purple-50"
                      >
                        View
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md gap-2 border-2 border-[#29AA85]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 border border-[#29AA85]">
                        <Globe className="h-4 w-4 text-[#29AA85]" />
                      </div>
                      <div>
                        <div className="font-medium">Website Status</div>
                        <div className="text-sm text-[#7D8496]">Online, 99.8% uptime</div>
                      </div>
                    </div>
                    <Link href="/website-status">
                      <Button size="sm" variant="outline" className="border-[#29AA85] text-[#29AA85] hover:bg-green-50">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest changes and analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-[#29AA85]" />
                    </div>
                    <div>
                      <div className="font-medium">Full website analysis completed</div>
                      <div className="text-sm text-[#7D8496]">Today at 10:30 AM</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5 flex-shrink-0">
                      <Server className="h-5 w-5 text-[#F8B43B]" />
                    </div>
                    <div>
                      <div className="font-medium">Server response time increased</div>
                      <div className="text-sm text-[#7D8496]">Yesterday at 2:15 PM</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5 flex-shrink-0">
                      <Search className="h-5 w-5 text-[#537AEF]" />
                    </div>
                    <div>
                      <div className="font-medium">SEO improvements detected</div>
                      <div className="text-sm text-[#7D8496]">Apr 15, 2023 at 9:45 AM</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5 flex-shrink-0">
                      <Globe className="h-5 w-5 text-[#29AA85]" />
                    </div>
                    <div>
                      <div className="font-medium">Website uptime reached 99.8%</div>
                      <div className="text-sm text-[#7D8496]">Apr 12, 2023 at 11:20 AM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

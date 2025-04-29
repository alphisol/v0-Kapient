"use client"

import { ExternalLink, Link2, TrendingUp, AlertTriangle, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample backlink data
const backlinkData = {
  totalBacklinks: 1248,
  doFollowLinks: 876,
  noFollowLinks: 372,
  domainAuthority: 42,
  toxicBacklinks: 37,
  newBacklinks: 28,
  lostBacklinks: 12,
  topBacklinks: [
    {
      domain: "techcrunch.com",
      url: "https://techcrunch.com/2023/04/15/best-monitoring-tools",
      authority: 92,
      type: "dofollow",
      anchor: "website monitoring tools",
    },
    {
      domain: "forbes.com",
      url: "https://forbes.com/sites/tech/2023/05/10/seo-tools-review",
      authority: 95,
      type: "dofollow",
      anchor: "SEO analysis platform",
    },
    {
      domain: "smashingmagazine.com",
      url: "https://smashingmagazine.com/2023/03/website-performance-tools",
      authority: 88,
      type: "dofollow",
      anchor: "performance monitoring",
    },
    {
      domain: "searchenginejournal.com",
      url: "https://searchenginejournal.com/best-seo-tools/458921",
      authority: 86,
      type: "nofollow",
      anchor: "website analysis tools",
    },
    {
      domain: "ahrefs.com",
      url: "https://ahrefs.com/blog/website-monitoring",
      authority: 90,
      type: "dofollow",
      anchor: "monitoring solutions",
    },
  ],
}

export function BacklinkAnalysis() {
  const getAuthorityColor = (authority: number) => {
    if (authority >= 80) return "text-green-600"
    if (authority >= 50) return "text-blue-600"
    if (authority >= 30) return "text-orange-500"
    return "text-gray-600"
  }

  const getAuthorityBadge = (authority: number) => {
    if (authority >= 80) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">High</Badge>
    } else if (authority >= 50) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>
    } else {
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Low</Badge>
    }
  }

  const getLinkTypeBadge = (type: string) => {
    if (type === "dofollow") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          DoFollow
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          NoFollow
        </Badge>
      )
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Backlink Overview</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Summary of your website's backlink profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <div className="text-[10px] xs:text-xs text-gray-500">Total Backlinks</div>
                <div className="text-lg sm:text-2xl font-bold">{backlinkData.totalBacklinks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] xs:text-xs text-gray-500">Domain Authority</div>
                <div className="text-lg sm:text-2xl font-bold">{backlinkData.domainAuthority}/100</div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs sm:text-sm font-medium mb-2">Backlink Types</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] xs:text-xs sm:text-sm">DoFollow Links</span>
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{backlinkData.doFollowLinks}</span>
                  </div>
                  <Progress
                    value={(backlinkData.doFollowLinks / backlinkData.totalBacklinks) * 100}
                    className="h-1.5 sm:h-2 bg-gray-100"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] xs:text-xs sm:text-sm">NoFollow Links</span>
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{backlinkData.noFollowLinks}</span>
                  </div>
                  <Progress
                    value={(backlinkData.noFollowLinks / backlinkData.totalBacklinks) * 100}
                    className="h-1.5 sm:h-2 bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs sm:text-sm font-medium mb-2">Recent Changes</div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">+{backlinkData.newBacklinks}</div>
                    <div className="text-[10px] xs:text-xs text-gray-500">New links</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 transform rotate-180" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">-{backlinkData.lostBacklinks}</div>
                    <div className="text-[10px] xs:text-xs text-gray-500">Lost links</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium">
                    {backlinkData.toxicBacklinks} toxic backlinks detected
                  </div>
                  <div className="text-[10px] xs:text-xs text-gray-500">May negatively impact your SEO</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Button variant="outline" className="w-full text-xs sm:text-sm">
                <BarChart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                View Full Backlink Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Top Backlinks</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Your most valuable backlinks by domain authority
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Domain</TableHead>
                  <TableHead className="text-xs sm:text-sm">Authority</TableHead>
                  <TableHead className="text-xs sm:text-sm">Type</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Anchor Text</TableHead>
                  <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backlinkData.topBacklinks.map((backlink, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium flex items-center text-xs sm:text-sm">
                        <Link2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                        {backlink.domain}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className={`font-medium text-xs sm:text-sm ${getAuthorityColor(backlink.authority)}`}>
                          {backlink.authority}
                        </span>
                        {getAuthorityBadge(backlink.authority)}
                      </div>
                    </TableCell>
                    <TableCell>{getLinkTypeBadge(backlink.type)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none block">
                        {backlink.anchor}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={backlink.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="sr-only">Visit</span>
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              View All Backlinks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

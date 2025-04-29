"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, ArrowUpDown, Check, ChevronDown, ExternalLink, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data
const pages = [
  {
    url: "/",
    title: "Home Page",
    score: 85,
    issues: { critical: 0, warning: 2, info: 1 },
    status: "optimized",
  },
  {
    url: "/products",
    title: "Products",
    score: 72,
    issues: { critical: 1, warning: 3, info: 2 },
    status: "needs-improvement",
  },
  {
    url: "/services",
    title: "Services",
    score: 68,
    issues: { critical: 1, warning: 2, info: 0 },
    status: "needs-improvement",
  },
  {
    url: "/blog",
    title: "Blog",
    score: 90,
    issues: { critical: 0, warning: 1, info: 2 },
    status: "optimized",
  },
  {
    url: "/contact",
    title: "Contact",
    score: 78,
    issues: { critical: 0, warning: 2, info: 1 },
    status: "optimized",
  },
  {
    url: "/blog/article-1",
    title: "How to Improve Your SEO in 2023",
    score: 92,
    issues: { critical: 0, warning: 0, info: 2 },
    status: "optimized",
  },
  {
    url: "/blog/article-2",
    title: "Digital Marketing Guide",
    score: 65,
    issues: { critical: 1, warning: 3, info: 0 },
    status: "needs-improvement",
  },
  {
    url: "/products/category-1",
    title: "Product Category 1",
    score: 70,
    issues: { critical: 0, warning: 4, info: 1 },
    status: "needs-improvement",
  },
]

export function PageAnalysisTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const filteredPages = pages
    .filter((page) => {
      if (searchTerm === "") return true
      return (
        page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .filter((page) => {
      if (statusFilter.length === 0) return true
      return statusFilter.includes(page.status)
    })
    .sort((a, b) => {
      if (sortBy === "score") {
        return sortDirection === "asc" ? a.score - b.score : b.score - a.score
      } else if (sortBy === "issues") {
        const aTotal = a.issues.critical * 3 + a.issues.warning * 2 + a.issues.info
        const bTotal = b.issues.critical * 3 + b.issues.warning * 2 + b.issues.info
        return sortDirection === "asc" ? aTotal - bTotal : bTotal - aTotal
      } else if (sortBy === "url") {
        return sortDirection === "asc" ? a.url.localeCompare(b.url) : b.url.localeCompare(a.url)
      } else if (sortBy === "title") {
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }
      return 0
    })

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by URL or title..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                Status
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("optimized")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "optimized"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "optimized"))
                  }
                }}
              >
                Optimized
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("needs-improvement")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "needs-improvement"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "needs-improvement"))
                  }
                }}
              >
                Needs Improvement
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">
                <Button variant="ghost" onClick={() => handleSort("url")} className="flex items-center font-medium">
                  URL / Title
                  {sortBy === "url" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("score")} className="flex items-center font-medium">
                  SEO Score
                  {sortBy === "score" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("issues")} className="flex items-center font-medium">
                  Issues
                  {sortBy === "issues" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page.url}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center">
                      {page.url}
                      <ExternalLink className="ml-1 h-3 w-3 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-500">{page.title}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getScoreColor(page.score)}`}>{page.score}</span>
                    <Progress value={page.score} className={`h-2 w-24 ${getScoreProgressColor(page.score)}`} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {page.issues.critical > 0 && (
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">{page.issues.critical}</span>
                      </div>
                    )}
                    {page.issues.warning > 0 && (
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                        <span className="text-sm">{page.issues.warning}</span>
                      </div>
                    )}
                    {page.issues.info > 0 && (
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm">{page.issues.info}</span>
                      </div>
                    )}
                    {page.issues.critical === 0 && page.issues.warning === 0 && page.issues.info === 0 && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">No issues</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Analyze</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

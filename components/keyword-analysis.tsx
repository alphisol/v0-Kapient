"use client"

import { useState } from "react"
import { Search, ArrowUp, ArrowDown, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample keyword data
const keywordData = [
  {
    keyword: "website monitoring",
    position: 12,
    previousPosition: 15,
    searchVolume: 5400,
    difficulty: 68,
    traffic: 210,
    intent: "commercial",
  },
  {
    keyword: "seo analysis tool",
    position: 8,
    previousPosition: 10,
    searchVolume: 8200,
    difficulty: 72,
    traffic: 450,
    intent: "commercial",
  },
  {
    keyword: "website performance monitoring",
    position: 5,
    previousPosition: 7,
    searchVolume: 3100,
    difficulty: 65,
    traffic: 380,
    intent: "informational",
  },
  {
    keyword: "best seo tools",
    position: 18,
    previousPosition: 22,
    searchVolume: 12500,
    difficulty: 85,
    traffic: 180,
    intent: "commercial",
  },
  {
    keyword: "how to improve website seo",
    position: 14,
    previousPosition: 11,
    searchVolume: 9800,
    difficulty: 70,
    traffic: 320,
    intent: "informational",
  },
  {
    keyword: "website speed test",
    position: 25,
    previousPosition: 31,
    searchVolume: 18500,
    difficulty: 75,
    traffic: 120,
    intent: "transactional",
  },
  {
    keyword: "seo audit",
    position: 9,
    previousPosition: 12,
    searchVolume: 7300,
    difficulty: 69,
    traffic: 390,
    intent: "commercial",
  },
]

export function KeywordAnalysis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("position")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  const filteredKeywords = keywordData
    .filter((keyword) => {
      if (searchTerm === "") return true
      return keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUp className="h-4 w-4 mr-1" />
          {change}
        </div>
      )
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDown className="h-4 w-4 mr-1" />
          {Math.abs(change)}
        </div>
      )
    } else {
      return <span className="text-gray-500">-</span>
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 80) return "bg-red-500"
    if (difficulty >= 60) return "bg-orange-500"
    if (difficulty >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getIntentBadge = (intent: string) => {
    switch (intent) {
      case "commercial":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Commercial
          </Badge>
        )
      case "informational":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Informational
          </Badge>
        )
      case "transactional":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Transactional
          </Badge>
        )
      default:
        return <Badge variant="outline">{intent}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">Keyword Rankings</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Track your website's performance for target keywords in search engine results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            <Input
              placeholder="Search keywords..."
              className="pl-7 sm:pl-8 text-xs sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="text-xs sm:text-sm">Add Keywords</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("keyword")}
                    className="flex items-center font-medium text-xs sm:text-sm"
                  >
                    Keyword
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("position")}
                    className="flex items-center font-medium text-xs sm:text-sm"
                  >
                    Position
                  </Button>
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("searchVolume")}
                    className="flex items-center font-medium text-xs sm:text-sm"
                  >
                    <div className="flex items-center">
                      Search Volume
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">Monthly search volume for this keyword</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("difficulty")}
                    className="flex items-center font-medium text-xs sm:text-sm"
                  >
                    <div className="flex items-center">
                      Difficulty
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">How difficult it is to rank for this keyword (0-100)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("traffic")}
                    className="flex items-center font-medium text-xs sm:text-sm"
                  >
                    Traffic
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("intent")}
                    className="flex items-center font-medium text-xs sm:text-sm"
                  >
                    Intent
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeywords.map((keyword) => (
                <TableRow key={keyword.keyword}>
                  <TableCell>
                    <div className="font-medium flex items-center text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                      {keyword.keyword}
                      <ExternalLink className="ml-1 h-3 w-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs sm:text-sm">{keyword.position}</span>
                      {getPositionChange(keyword.position, keyword.previousPosition)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{keyword.searchVolume.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs sm:text-sm">{keyword.difficulty}</span>
                      <Progress
                        value={keyword.difficulty}
                        className={`h-1.5 sm:h-2 w-12 sm:w-16 ${getDifficultyColor(keyword.difficulty)}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs sm:text-sm">
                    {keyword.traffic.toLocaleString()}
                  </TableCell>
                  <TableCell>{getIntentBadge(keyword.intent)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, CheckSquare, Square, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getSeverityColor, getSourceBadgeColor } from "@/lib/color-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SeoIssueProps {
  issue: {
    id: number
    title: string
    description: string
    severity: "critical" | "warning" | "moderate" | "info"
    affectedPages?: string[]
    recommendation: string
    source?: string
    isPageLevel?: boolean
    simpleExplanation?: string
    date?: string
  }
  isSelected?: boolean
  onSelect?: () => void
  isSelectable?: boolean
}

export function SEOIssueCard({ issue, isSelected = false, onSelect, isSelectable = false }: SeoIssueProps) {
  const [expanded, setExpanded] = useState(false)

  // Get the badge color for the impact level
  const getImpactBadgeColor = () => {
    switch (issue.severity) {
      case "critical":
        return "bg-white text-red-800 border border-red-500"
      case "warning":
        return "bg-white text-yellow-800 border border-yellow-500"
      case "moderate":
      case "info":
        return "bg-white text-green-800 border border-green-500"
    }
  }

  return (
    <Card className={cn("border-l-4", getSeverityColor(issue.severity), isSelected ? "ring-2 ring-[#537AEF]" : "")}>
      <CardContent className="p-3 sm:p-4 bg-white">
        <div className="flex items-start">
          {isSelectable && (
            <div
              className="mr-3 sm:mr-4 mt-0.5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onSelect && onSelect()
              }}
            >
              {isSelected ? (
                <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#537AEF]" />
              ) : (
                <Square className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {/* Title row with Fix Now button */}
            <div className="flex flex-wrap items-center justify-between mb-2">
              <div className="flex items-center mr-2">
                <h3 className="font-medium text-sm sm:text-base text-[#323048] truncate">{issue.title}</h3>
                {issue.simpleExplanation && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto ml-2">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black border border-gray-200 p-3 max-w-xs">
                        <p className="font-medium mb-1">En términos simples:</p>
                        <p>{issue.simpleExplanation}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex items-center gap-2">
                {issue.source && (
                  <Badge className={cn("mr-2", getSourceBadgeColor(issue.source))}>{issue.source}</Badge>
                )}
                {issue.date && <span className="text-[10px] xs:text-xs text-[#7D8496] mr-2">{issue.date}</span>}
                <span
                  className={cn("text-[10px] xs:text-xs px-1.5 sm:px-2 py-0.5 rounded-full", getImpactBadgeColor())}
                >
                  {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                </span>
                <Button
                  size="sm"
                  className="text-xs sm:text-sm bg-[#537AEF] hover:bg-[#537AEF]/90 ml-2"
                  onClick={() => (window.location.href = `/seo-analysis/fix/${issue.id}`)}
                >
                  Fix Now
                </Button>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#7D8496] mb-2">{issue.description}</p>

            {/* View details button */}
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-xs sm:text-sm">
                {expanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    View details
                  </>
                )}
              </Button>
            </div>

            {/* Expanded details */}
            {expanded && (
              <div className="mt-4 space-y-3 border-t pt-3">
                {issue.affectedPages && issue.affectedPages.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium mb-1">Affected Pages:</h4>
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-[#7D8496]">
                      {issue.affectedPages.map((page, index) => (
                        <li key={index}>{page}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-1">Recommendation:</h4>
                  <p className="text-xs sm:text-sm text-[#7D8496]">{issue.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

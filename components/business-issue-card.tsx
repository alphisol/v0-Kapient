"use client"

import type React from "react"
import Link from "next/link"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BusinessIssue {
  id: number
  title: string
  description: string
  severity: "critical" | "warning" | "info"
  recommendation: string
  simpleExplanation: string
  date: string
}

interface BusinessIssueCardProps {
  issue: BusinessIssue
  isSelectable?: boolean
  isSelected?: boolean
  onSelect?: (id: number, selected: boolean) => void
}

export function BusinessIssueCard({
  issue,
  isSelectable = false,
  isSelected = false,
  onSelect,
}: BusinessIssueCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-red-500"
      case "warning":
        return "border-l-orange-500"
      case "info":
        return "border-l-blue-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <span className="inline-flex items-center rounded-full border border-red-500 px-2.5 py-0.5 text-xs font-semibold text-red-500">
            Critical
          </span>
        )
      case "warning":
        return (
          <span className="inline-flex items-center rounded-full border border-orange-500 px-2.5 py-0.5 text-xs font-semibold text-orange-500">
            Warning
          </span>
        )
      case "info":
        return (
          <span className="inline-flex items-center rounded-full border border-blue-500 px-2.5 py-0.5 text-xs font-semibold text-blue-500">
            Info
          </span>
        )
      default:
        return null
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSelect) {
      onSelect(issue.id, !isSelected)
    }
  }

  return (
    <Card className={`border-l-4 ${getSeverityColor(issue.severity)} ${isSelected ? "ring-2 ring-[#537AEF]" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isSelectable && (
              <div
                className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 cursor-pointer"
                onClick={handleCheckboxClick}
              >
                {isSelected ? <div className="h-3 w-3 rounded-sm bg-[#537AEF]"></div> : null}
              </div>
            )}
            <h3 className="font-medium">{issue.title}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-white text-black border border-gray-200 p-3 shadow-lg">
                  <p className="font-medium mb-1">En términos simples:</p>
                  <p className="text-sm">{issue.simpleExplanation}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
              Business
            </span>
            {getSeverityBadge(issue.severity)}
            <Button asChild size="sm">
              <Link href={`/business-presence/fix/${issue.id}`}>Fix Now</Link>
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{issue.description}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/business-presence/issues/${issue.id}`}>View details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

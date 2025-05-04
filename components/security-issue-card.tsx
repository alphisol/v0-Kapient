"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface SecurityIssue {
  id: number
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  explanation: string
}

interface SecurityIssueCardProps {
  issue: SecurityIssue
}

export function SecurityIssueCard({ issue }: SecurityIssueCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)

  const severityIcon = {
    critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
    high: <AlertTriangle className="h-5 w-5 text-orange-500" />,
    medium: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    low: <AlertCircle className="h-5 w-5 text-blue-500" />,
  }

  const severityBadge = {
    critical: <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800">Critical</span>,
    high: <span className="px-2 py-1 text-xs font-medium rounded-md bg-orange-100 text-orange-800">High</span>,
    medium: <span className="px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-800">Medium</span>,
    low: <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800">Low</span>,
  }

  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{severityIcon[issue.severity]}</div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-medium text-gray-900">{issue.title}</h3>
            {severityBadge[issue.severity]}
          </div>

          <p className="text-sm text-gray-600 mt-1">{issue.description}</p>

          <div className="mt-4">
            <div className="mb-2">
              <h4 className="text-sm font-medium">What this means:</h4>
              <p className="text-sm text-gray-600 mt-1">{issue.explanation}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button size="sm" className="bg-kapient-blue hover:bg-kapient-blue/90">
                Fix Now
              </Button>

              <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => setDetailsOpen(!detailsOpen)}>
                View details{" "}
                {detailsOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

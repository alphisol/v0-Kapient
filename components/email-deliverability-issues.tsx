"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmailIssueCard } from "@/components/email-issue-card"

interface EmailDeliverabilityIssuesProps {
  domain: string
}

export function EmailDeliverabilityIssues({ domain }: EmailDeliverabilityIssuesProps) {
  const [selectedIssues, setSelectedIssues] = useState<number[]>([])

  // This would be fetched from an API in a real implementation
  const issues = [
    {
      id: 1,
      title: "Missing DKIM Record",
      description: "Your domain is missing a DKIM (DomainKeys Identified Mail) record.",
      severity: "critical",
      recommendation:
        "Set up DKIM authentication by adding the appropriate TXT record to your DNS configuration. Contact your email service provider for the exact record to add.",
      simpleExplanation:
        "DKIM adds a digital signature to your emails that helps receiving servers verify they weren't altered in transit. Without it, your emails are more likely to be marked as spam.",
      date: "2023-05-04",
    },
    {
      id: 2,
      title: "Weak DMARC Policy",
      description:
        "Your DMARC policy is set to 'none', which only monitors but doesn't protect against email spoofing.",
      severity: "warning",
      recommendation:
        "Gradually strengthen your DMARC policy by changing from 'p=none' to 'p=quarantine' and eventually to 'p=reject' after monitoring for legitimate email failures.",
      simpleExplanation:
        "DMARC tells receiving servers what to do with emails that fail authentication. A 'none' policy means suspicious emails still reach inboxes.",
      date: "2023-05-04",
    },
    {
      id: 3,
      title: "IP Address Listed on SORBS",
      description: "One of your sending IP addresses is listed on the SORBS blacklist.",
      severity: "critical",
      recommendation:
        "Request removal from the SORBS blacklist by following their delisting procedure. Ensure your server is not an open relay and is not sending spam.",
      simpleExplanation:
        "Being on a blacklist means many email providers will automatically reject or filter your messages.",
      date: "2023-05-04",
    },
  ]

  const handleSelectIssue = (id: number, selected: boolean) => {
    if (selected) {
      setSelectedIssues([...selectedIssues, id])
    } else {
      setSelectedIssues(selectedIssues.filter((issueId) => issueId !== id))
    }
  }

  const handleSelectAll = () => {
    if (selectedIssues.length === issues.length) {
      setSelectedIssues([])
    } else {
      setSelectedIssues(issues.map((issue) => issue.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Email Deliverability Issues</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            {selectedIssues.length === issues.length ? "Deselect All" : "Select All"}
          </Button>
          <Button size="sm" disabled={selectedIssues.length === 0}>
            Fix Selected ({selectedIssues.length})
          </Button>
        </div>
      </div>

      {issues.map((issue) => (
        <EmailIssueCard
          key={issue.id}
          issue={issue}
          isSelectable={true}
          isSelected={selectedIssues.includes(issue.id)}
          onSelect={handleSelectIssue}
        />
      ))}
    </div>
  )
}

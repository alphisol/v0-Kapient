"use client"

import { SEOIssueCard } from "@/components/seo-issue-card"

interface EmailDeliverabilityIssuesProps {
  domain: string
}

export function EmailDeliverabilityIssues({ domain }: EmailDeliverabilityIssuesProps) {
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

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <SEOIssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { SecurityIssueCard } from "@/components/security-issue-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle } from "lucide-react"

export function SecurityIssues() {
  const [activeTab, setActiveTab] = useState("critical")

  const criticalIssues = [
    {
      id: 1,
      title: "SQL Injection Vulnerability",
      description: "3 endpoints are vulnerable to SQL injection attacks.",
      severity: "critical",
      explanation:
        "SQL injection vulnerabilities allow attackers to execute malicious SQL statements that control your database server, potentially exposing sensitive data or allowing unauthorized access.",
    },
    {
      id: 2,
      title: "Cross-Site Scripting (XSS)",
      description: "5 pages contain XSS vulnerabilities.",
      severity: "critical",
      explanation:
        "XSS vulnerabilities allow attackers to inject client-side scripts into web pages viewed by other users, potentially stealing cookies, session tokens, or other sensitive information.",
    },
  ]

  const allIssues = [
    ...criticalIssues,
    {
      id: 3,
      title: "Outdated Libraries",
      description: "7 libraries need security updates.",
      severity: "high",
      explanation:
        "Outdated libraries may contain known security vulnerabilities that could be exploited by attackers.",
    },
    {
      id: 4,
      title: "Insecure HTTP",
      description: "3 resources are loaded over insecure HTTP.",
      severity: "medium",
      explanation: "Loading resources over HTTP instead of HTTPS can expose your site to man-in-the-middle attacks.",
    },
    {
      id: 5,
      title: "CSRF Vulnerability",
      description: "1 form lacks CSRF protection.",
      severity: "high",
      explanation:
        "Cross-Site Request Forgery vulnerabilities allow attackers to trick users into performing unwanted actions on your site.",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold">Critical Security Issues</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          These issues have the highest impact on your website security and should be addressed immediately
        </p>
      </div>

      <div className="p-4 border-b border-gray-200">
        <Tabs defaultValue="critical" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-[300px]">
            <TabsTrigger value="critical">Critical Issues ({criticalIssues.length})</TabsTrigger>
            <TabsTrigger value="all">All Issues ({allIssues.length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="divide-y divide-gray-200">
        {(activeTab === "critical" ? criticalIssues : allIssues).map((issue) => (
          <SecurityIssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityMetrics } from "@/components/security-metrics"
import { SecurityIssues } from "@/components/security-issues"
import { ComplianceIssues } from "@/components/compliance-issues"
import { PrivacyIssues } from "@/components/privacy-issues"
import { SecurityScanResults } from "@/components/security-scan-results"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

export function SecurityComplianceDashboard() {
  const [activeTab, setActiveTab] = useState("security")
  const lastScan = "May 4, 2023, 11:01 AM"

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Compliance Dashboard</h1>
          <p className="text-gray-600">Monitor and address security vulnerabilities and compliance issues</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Scan Now
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <SecurityMetrics />

      <Tabs defaultValue="security" className="mt-8" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SecurityIssues />
            </div>
            <div>
              <SecurityScanResults lastScan={lastScan} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceIssues />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacyIssues />
        </TabsContent>
      </Tabs>
    </div>
  )
}

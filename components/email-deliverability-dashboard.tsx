"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailAuthenticationStatus } from "@/components/email-authentication-status"
import { BlacklistStatus } from "@/components/blacklist-status"
import { EmailReputationScore } from "@/components/email-reputation-score"
import { EmailDeliverabilityIssues } from "@/components/email-deliverability-issues"
import { EmailReputationSection } from "@/components/email-reputation-section"

export function EmailDeliverabilityDashboard() {
  const [domain, setDomain] = useState("example.com")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Email Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailReputationScore score={78} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Authentication Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">3 of 4 authentication methods properly configured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blacklist Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Clean</div>
            <p className="text-xs text-muted-foreground">Not listed on any major blacklists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">1</div>
            <p className="text-xs text-muted-foreground">1 critical issue needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="issues">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="blacklists">Blacklists</TabsTrigger>
          <TabsTrigger value="reputation">Reputation</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Deliverability Issues</CardTitle>
              <CardDescription>Issues that may affect your email deliverability and sender reputation</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailDeliverabilityIssues domain={domain} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Authentication</CardTitle>
              <CardDescription>Status of email authentication records for your domain</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailAuthenticationStatus domain={domain} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blacklists" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Blacklist Status</CardTitle>
              <CardDescription>Check if your domain or IP addresses are listed on email blacklists</CardDescription>
            </CardHeader>
            <CardContent>
              <BlacklistStatus domain={domain} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reputation" className="mt-6">
          <EmailReputationSection domain={domain} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

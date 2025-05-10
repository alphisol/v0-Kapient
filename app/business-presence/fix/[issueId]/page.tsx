"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, Building, Send, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BusinessPresenceFixPage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")

  // This would be fetched from an API in a real implementation
  const issue = {
    id: params.issueId,
    title: "Inconsistent Business Address",
    description: "Your business address is inconsistent across 3 major directories.",
    severity: "high",
    detectedDate: "May 8, 2023",
    recommendation: "Update your business address to be consistent across all online directories.",
    simpleExplanation:
      "When your business address is different across various online listings, it confuses both customers and search engines. This can make it harder for customers to find you and can hurt your local search rankings.",
    technicalDetails:
      "Address inconsistencies create NAP (Name, Address, Phone) discrepancies across the local search ecosystem. Google and other search engines use NAP consistency as a trust signal for local ranking algorithms.",
    estimatedTime: "45-90 minutes",
    steps: [
      {
        title: "Identify inconsistent listings",
        description: "Review all the directories where your address is inconsistent.",
        technicalDescription:
          "Use the provided report to identify all directories with inconsistent address information. Note the exact format and details of each inconsistent listing.",
        estimatedTime: "10-15 minutes",
      },
      {
        title: "Determine the correct address format",
        description: "Decide on the exact format of your address that you want to use consistently.",
        technicalDescription:
          "Choose a standardized address format that follows USPS guidelines. Include suite/unit numbers, abbreviate or spell out street suffixes consistently (St. vs Street), and use consistent city/state formatting.",
        estimatedTime: "5 minutes",
      },
      {
        title: "Update Google Business Profile",
        description: "Start by updating your address on Google Business Profile.",
        technicalDescription:
          "Log in to your Google Business Profile, navigate to Info > Address, and update with your standardized format. This is the most important listing to correct first as it feeds many other directories.",
        estimatedTime: "10 minutes",
      },
      {
        title: "Update primary data aggregators",
        description: "Update your address on major data aggregators like Infogroup, Acxiom, and Localeze.",
        technicalDescription:
          "These data aggregators supply business information to hundreds of directories. Updating these will help propagate your correct address across the ecosystem.",
        estimatedTime: "20-30 minutes",
      },
      {
        title: "Update remaining directories",
        description: "Manually update your address on remaining directories that show inconsistencies.",
        technicalDescription:
          "Log in to each directory account and update your address. For directories where you don't have account access, claim your listing or contact customer support to request changes.",
        estimatedTime: "30-60 minutes",
      },
    ],
    affectedDirectories: [
      {
        name: "Google Business Profile",
        currentAddress: "123 Main St, Suite 101, New York, NY",
        correctAddress: "123 Main Street, Suite 101, New York, NY 10001",
      },
      {
        name: "Yelp",
        currentAddress: "123 Main Street, New York, NY 10001",
        correctAddress: "123 Main Street, Suite 101, New York, NY 10001",
      },
      {
        name: "Yellow Pages",
        currentAddress: "123 Main St., Ste 101, New York, New York",
        correctAddress: "123 Main Street, Suite 101, New York, NY 10001",
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/business-presence">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Fix: {issue.title}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Issue detected on {issue.detectedDate} • ID: {issue.id}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Suggested Fix Plan</CardTitle>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Estimated time: {issue.estimatedTime}
            </div>
          </div>
          <CardDescription>
            This plan outlines the recommended steps to fix the {issue.title.toLowerCase()} issue. These are suggestions
            and may need to be adapted to your specific business listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <Building className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Recommendation Only</h3>
                <p className="text-amber-700 text-sm">
                  This is a suggested plan of action. These changes need to be implemented manually by updating your
                  business listings on each platform.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="non-technical" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="non-technical">Non-Technical Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
            </TabsList>

            <TabsContent value="non-technical" className="space-y-4 pt-4">
              <div className="bg-white border rounded-md p-4 shadow-sm">
                <h3 className="font-medium text-lg mb-2">In Simple Terms</h3>
                <p className="text-gray-700">{issue.simpleExplanation}</p>
              </div>

              <h3 className="font-medium text-lg">What You Need To Do</h3>
              <ol className="space-y-4">
                {issue.steps.map((step, index) => (
                  <li key={index} className="border rounded-md p-4 bg-white shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Estimated time: {step.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-gray-50 border rounded-md p-4 mt-6">
                <h3 className="font-medium mb-2">Good to know</h3>
                <p className="text-gray-600 text-sm">
                  Consistent business information across all online platforms helps customers find you more easily and
                  improves your local search rankings. It may take several weeks for all directories to update after
                  you've made changes.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 pt-4">
              <div className="bg-gray-50 border rounded-md p-4">
                <h3 className="font-medium mb-2">Technical Background</h3>
                <p className="text-gray-700">{issue.technicalDetails}</p>
              </div>

              <h3 className="font-medium text-lg">Affected Directories</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Directory
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Current Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Correct Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {issue.affectedDirectories.map((directory, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {directory.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {directory.currentAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {directory.correctAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-medium text-lg mt-6">Implementation Steps</h3>
              <ol className="space-y-4">
                {issue.steps.map((step, index) => (
                  <li key={index} className="border rounded-md p-4 bg-white shadow-sm">
                    <div>
                      <h4 className="font-medium">
                        {index + 1}. {step.title}
                      </h4>
                      <p className="text-gray-700 mt-1">{step.technicalDescription}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Estimated time: {step.estimatedTime}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-gray-50 border rounded-md p-4 mt-6">
                <h3 className="font-medium mb-2">Implementation Notes</h3>
                <p className="text-gray-600 text-sm">
                  After updating your listings, it's recommended to monitor them for 4-6 weeks to ensure changes are
                  properly propagated. Some directories update immediately, while others may take weeks to reflect
                  changes.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3 mt-8 justify-end">
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Print steps
            </Button>
            <Button variant="outline" className="flex items-center">
              <Send className="h-4 w-4 mr-2" />
              Forward to team
            </Button>
            <Button variant="outline" className="flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

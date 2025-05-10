"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, FormInput, Send, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FormPerformanceFixPage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")

  // This would be fetched from an API in a real implementation
  const issue = {
    id: params.issueId,
    title: "High Form Abandonment Rate",
    description:
      "Your contact form has an abandonment rate of 68%, significantly higher than the industry average of 40%.",
    severity: "high",
    detectedDate: "May 10, 2023",
    recommendation: "Optimize your contact form to reduce abandonment and increase conversion rates.",
    simpleExplanation:
      "Your contact form is losing too many potential leads. Most visitors start filling out the form but don't complete it, which means you're missing out on valuable customer inquiries and potential sales.",
    technicalDetails:
      "Form analytics show that 68% of users who begin filling out your contact form abandon it before submission. The average time spent on the form is 2 minutes 15 seconds, with most abandonment occurring at the phone number and company size fields. Mobile users have a higher abandonment rate (75%) compared to desktop users (62%).",
    estimatedTime: "1-2 days",
    steps: [
      {
        title: "Analyze form analytics",
        description: "Review detailed form analytics to identify specific drop-off points.",
        technicalDescription:
          "Implement form field tracking to identify which specific fields cause users to abandon the form. Look for time spent on each field, field refill rates, and field abandonment rates.",
        estimatedTime: "2-3 hours",
      },
      {
        title: "Reduce form length",
        description: "Eliminate unnecessary fields to make the form shorter and easier to complete.",
        technicalDescription:
          "Remove non-essential fields that aren't critical for initial contact. Consider a two-stage form approach where only essential information is collected initially, with additional details gathered later in the process.",
        estimatedTime: "1-2 hours",
      },
      {
        title: "Improve field validation",
        description: "Make error messages more helpful and validate fields in real-time.",
        technicalDescription:
          "Implement inline validation that provides immediate feedback as users complete each field. Use clear, friendly error messages that explain exactly what needs to be fixed and how.",
        estimatedTime: "3-4 hours",
      },
      {
        title: "Optimize for mobile",
        description: "Make the form easier to complete on mobile devices.",
        technicalDescription:
          "Use appropriate input types (tel, email, etc.), larger touch targets, and simplified layouts for mobile users. Test the form on multiple devices and screen sizes to ensure a smooth experience.",
        estimatedTime: "4-6 hours",
      },
      {
        title: "Add progress indicators",
        description: "Show users how far along they are in the form completion process.",
        technicalDescription:
          "For multi-step forms, add a progress bar or step indicator. For single-page forms with multiple sections, use visual cues to show completion progress.",
        estimatedTime: "2-3 hours",
      },
    ],
    problemFields: [
      {
        name: "Phone Number",
        abandonmentRate: "42%",
        averageTimeSpent: "35 seconds",
        issue: "Strict format requirements without clear guidance",
      },
      {
        name: "Company Size",
        abandonmentRate: "38%",
        averageTimeSpent: "28 seconds",
        issue: "Dropdown with too many options",
      },
      {
        name: "Project Description",
        abandonmentRate: "25%",
        averageTimeSpent: "65 seconds",
        issue: "Text area too small with high minimum character count",
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/form-performance">
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
            and may need to be adapted to your specific form and website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <FormInput className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Recommendation Only</h3>
                <p className="text-amber-700 text-sm">
                  This is a suggested plan of action. These changes need to be implemented by your web development team.
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
                  Every 10% reduction in form abandonment can significantly increase your leads and potential revenue.
                  Simple changes like removing unnecessary fields can often have a dramatic impact on completion rates.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 pt-4">
              <div className="bg-gray-50 border rounded-md p-4">
                <h3 className="font-medium mb-2">Technical Background</h3>
                <p className="text-gray-700">{issue.technicalDetails}</p>
              </div>

              <h3 className="font-medium text-lg">Problem Fields</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Field
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Abandonment Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Avg. Time Spent
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Issue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {issue.problemFields.map((field, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                          {field.abandonmentRate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.averageTimeSpent}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{field.issue}</td>
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
                  Consider implementing A/B testing to validate changes before full deployment. This allows you to
                  measure the impact of each change and optimize based on real user data rather than assumptions.
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
              Forward to development team
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

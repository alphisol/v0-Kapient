"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, Mail, Send, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailDeliverabilityFixPage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")

  // This would be fetched from an API in a real implementation
  const issue = {
    id: params.issueId,
    title: "Missing DKIM Record",
    description: "Your domain is missing a DKIM (DomainKeys Identified Mail) record.",
    severity: "critical",
    detectedDate: "May 4, 2023",
    recommendation: "Set up DKIM authentication by adding the appropriate TXT record to your DNS configuration.",
    simpleExplanation:
      "DKIM adds a digital signature to your emails that helps receiving servers verify they weren't altered in transit. Without it, your emails are more likely to be marked as spam.",
    technicalDetails:
      "DKIM (DomainKeys Identified Mail) is an email authentication method designed to detect email spoofing. It allows the receiver to check that an email claimed to have come from a specific domain was indeed authorized by the owner of that domain.",
    estimatedTime: "30-60 minutes",
    steps: [
      {
        title: "Contact your email service provider",
        description:
          "Reach out to your email service provider (ESP) to obtain the DKIM selector and value for your domain.",
        technicalDescription:
          "Your ESP will provide you with a selector name (e.g., 'mail' or 'selector1') and a public key value that needs to be added to your DNS.",
        estimatedTime: "5-10 minutes",
      },
      {
        title: "Access your DNS management",
        description: "Log in to your domain registrar or DNS provider's control panel.",
        technicalDescription:
          "You'll need administrative access to your domain's DNS settings. This is typically available through your domain registrar (e.g., GoDaddy, Namecheap) or DNS provider (e.g., Cloudflare, AWS Route 53).",
        estimatedTime: "2-5 minutes",
      },
      {
        title: "Add the DKIM TXT record",
        description: "Create a new TXT record using the information provided by your email service provider.",
        technicalDescription:
          "Create a new TXT record with the host/name in the format: selector._domainkey.yourdomain.com (replace 'selector' with the selector provided by your ESP and 'yourdomain.com' with your actual domain). The value should be the entire string provided by your ESP, including the quotation marks if specified.",
        estimatedTime: "5-10 minutes",
      },
      {
        title: "Verify record propagation",
        description: "Wait for the DNS changes to propagate and verify the record is correctly set up.",
        technicalDescription:
          "DNS changes can take anywhere from a few minutes to 48 hours to propagate globally. You can verify your DKIM record using online tools like MXToolbox or by using the dig command: dig TXT selector._domainkey.yourdomain.com",
        estimatedTime: "1-48 hours",
      },
      {
        title: "Test email authentication",
        description: "Send a test email and verify that DKIM is working correctly.",
        technicalDescription:
          "Send a test email to an address that allows you to view email headers (like Gmail). Check the headers for 'DKIM=pass' to confirm your implementation is working correctly.",
        estimatedTime: "5-10 minutes",
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/email-deliverability">
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
            and may need to be adapted to your specific email setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Recommendation Only</h3>
                <p className="text-amber-700 text-sm">
                  This is a suggested plan of action. These changes need to be implemented manually by your email
                  administrator.
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
                  Email authentication is crucial for deliverability. Without proper authentication like DKIM, your
                  emails are more likely to be marked as spam or rejected entirely by receiving servers.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 pt-4">
              <div className="bg-gray-50 border rounded-md p-4">
                <h3 className="font-medium mb-2">Technical Background</h3>
                <p className="text-gray-700">{issue.technicalDetails}</p>
              </div>

              <h3 className="font-medium text-lg">Implementation Steps</h3>
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
                <h3 className="font-medium mb-2">Manual Implementation</h3>
                <p className="text-gray-600 text-sm">
                  These changes need to be implemented by someone with access to your domain's DNS settings and
                  knowledge of your email infrastructure. If you're unsure, consider consulting with your IT team or
                  email service provider.
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
              Forward to IT team
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

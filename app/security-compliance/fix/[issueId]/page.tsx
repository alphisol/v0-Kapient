"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, Shield, Send, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SecurityComplianceFixPage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")

  // This would be fetched from an API in a real implementation
  const issue = {
    id: params.issueId,
    title: "Insecure Password Policy",
    description: "Your website's password policy does not meet current security standards.",
    severity: "critical",
    detectedDate: "May 7, 2023",
    recommendation:
      "Update your password policy to require stronger passwords and implement additional security measures.",
    simpleExplanation:
      "Your website allows users to create passwords that are too easy to guess or crack. This makes it easier for hackers to break into user accounts and potentially access sensitive information.",
    technicalDetails:
      "The current password policy does not enforce sufficient complexity requirements (minimum length, character variety) and does not implement modern security practices like rate limiting on login attempts and multi-factor authentication options.",
    estimatedTime: "2-4 hours",
    steps: [
      {
        title: "Update password length requirements",
        description: "Increase the minimum password length to at least 12 characters.",
        technicalDescription:
          "Modify your authentication system's password validation rules to require a minimum of 12 characters. This significantly increases the time required for brute force attacks.",
        estimatedTime: "15-30 minutes",
      },
      {
        title: "Implement complexity requirements",
        description: "Require passwords to include a mix of character types.",
        technicalDescription:
          "Update password validation to require at least one uppercase letter, one lowercase letter, one number, and one special character. Consider using a password strength meter to provide visual feedback to users.",
        estimatedTime: "30-60 minutes",
      },
      {
        title: "Add rate limiting for login attempts",
        description: "Limit the number of failed login attempts to prevent brute force attacks.",
        technicalDescription:
          "Implement progressive rate limiting that temporarily locks accounts after multiple failed attempts. Consider a system that increases lockout duration with successive failures (e.g., 5 minutes after 5 failures, 30 minutes after 10 failures).",
        estimatedTime: "45-90 minutes",
      },
      {
        title: "Implement multi-factor authentication",
        description: "Add an option for users to enable two-factor authentication.",
        technicalDescription:
          "Integrate a 2FA solution using time-based one-time passwords (TOTP) via apps like Google Authenticator or Authy. Alternatively, implement SMS-based verification codes as a minimum.",
        estimatedTime: "60-120 minutes",
      },
      {
        title: "Update password reset flow",
        description: "Improve the security of your password reset process.",
        technicalDescription:
          "Ensure password reset tokens are single-use, time-limited (expire after 1 hour), and sent only to verified email addresses. Implement notification emails when passwords are changed.",
        estimatedTime: "30-60 minutes",
      },
    ],
    complianceImpact: [
      {
        standard: "PCI DSS",
        requirement: "Requirement 8.2.3",
        description: "Passwords/passphrases must meet complexity requirements.",
      },
      {
        standard: "GDPR",
        requirement: "Article 32",
        description: "Implement appropriate technical measures to ensure data security.",
      },
      {
        standard: "NIST SP 800-63B",
        requirement: "Section 5.1.1",
        description: "Memorized secret authenticators (passwords) should be at least 8 characters in length.",
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/security-compliance">
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
            and may need to be adapted to your specific security infrastructure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Recommendation Only</h3>
                <p className="text-amber-700 text-sm">
                  This is a suggested plan of action. These changes need to be implemented by your development or IT
                  security team.
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
                  Strong password policies are essential for protecting user accounts and sensitive data. Many data
                  breaches occur because of weak passwords that are easily guessed or cracked by attackers.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 pt-4">
              <div className="bg-gray-50 border rounded-md p-4">
                <h3 className="font-medium mb-2">Technical Background</h3>
                <p className="text-gray-700">{issue.technicalDetails}</p>
              </div>

              <h3 className="font-medium text-lg">Compliance Impact</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Standard
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Requirement
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {issue.complianceImpact.map((impact, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {impact.standard}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{impact.requirement}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{impact.description}</td>
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
                  When implementing these changes, consider a phased approach that requires existing users to update
                  their passwords upon next login. Provide clear communication about the new requirements and why
                  they're important for security.
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
              Forward to security team
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

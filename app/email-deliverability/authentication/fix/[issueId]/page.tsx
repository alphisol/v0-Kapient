"use client"

import { useState } from "react"
import { ArrowLeft, Clock, FileText, Send, XCircle, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailAuthenticationFixPage({ params }: { params: { issueId: string } }) {
  const [activeTab, setActiveTab] = useState("non-technical")

  // This would be fetched from an API in a real implementation
  const issues = {
    "spf-issue": {
      id: "spf-issue",
      title: "Invalid SPF Record",
      description: "Your SPF record is not properly configured.",
      severity: "warning",
      detectedDate: "May 5, 2023",
      recommendation: "Update your SPF record to include all authorized email senders.",
      simpleExplanation:
        "SPF tells receiving servers which servers are allowed to send emails from your domain. Without a proper SPF record, your emails might be marked as spam.",
      technicalDetails:
        "SPF (Sender Policy Framework) is an email authentication method designed to detect forging sender addresses during the delivery of the email.",
      estimatedTime: "15-30 minutes",
      steps: [
        {
          title: "Identify all your email sending services",
          description:
            "Make a list of all services that send emails on behalf of your domain (e.g., your mail server, Google Workspace, marketing tools).",
          technicalDescription:
            "You need to identify all IP addresses and third-party services that legitimately send email from your domain.",
          estimatedTime: "5-10 minutes",
        },
        {
          title: "Access your DNS management",
          description: "Log in to your domain registrar or DNS provider's control panel.",
          technicalDescription:
            "You'll need administrative access to your domain's DNS settings through your domain registrar or DNS provider.",
          estimatedTime: "2-5 minutes",
        },
        {
          title: "Create or update your SPF record",
          description: "Add or modify the TXT record for SPF with the correct information.",
          technicalDescription:
            "Create a TXT record with the host/name @ and a value that includes all your authorized senders, e.g., 'v=spf1 include:_spf.google.com include:sendgrid.net ip4:192.168.1.1 ~all'",
          estimatedTime: "5-10 minutes",
        },
        {
          title: "Verify your SPF record",
          description: "Use an SPF record checker tool to verify your record is correctly formatted.",
          technicalDescription:
            "Use tools like MXToolbox or SPF Record Checker to validate your SPF record syntax and ensure it includes all necessary senders.",
          estimatedTime: "3-5 minutes",
        },
      ],
    },
    "dkim-issue": {
      id: "dkim-issue",
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
    },
    "dmarc-issue": {
      id: "dmarc-issue",
      title: "Invalid DMARC Policy",
      description: "Your DMARC policy is set to 'none', which only monitors but doesn't protect against spoofing.",
      severity: "warning",
      detectedDate: "May 4, 2023",
      recommendation: "Strengthen your DMARC policy by updating it from 'p=none' to 'p=quarantine' or 'p=reject'.",
      simpleExplanation:
        "DMARC tells receiving servers what to do with emails that fail authentication checks. A 'none' policy means suspicious emails still reach inboxes.",
      technicalDetails:
        "DMARC (Domain-based Message Authentication, Reporting, and Conformance) is an email authentication protocol that uses SPF and DKIM to detect email spoofing. It allows the domain owner to specify a policy on how to handle unauthenticated emails.",
      estimatedTime: "20-40 minutes",
      steps: [
        {
          title: "Ensure SPF and DKIM are working",
          description: "Before strengthening DMARC, make sure SPF and DKIM are properly configured and working.",
          technicalDescription:
            "DMARC relies on SPF and DKIM, so both should be correctly implemented and tested before changing your DMARC policy.",
          estimatedTime: "5-10 minutes",
        },
        {
          title: "Review DMARC reports",
          description:
            "If you already have a 'p=none' policy, review the reports to identify legitimate email sources.",
          technicalDescription:
            "Analyze the DMARC aggregate (rua) and forensic (ruf) reports to ensure all legitimate email sources are properly authenticated.",
          estimatedTime: "10-20 minutes",
        },
        {
          title: "Update your DMARC record",
          description: "Modify your DMARC TXT record to use a stronger policy.",
          technicalDescription:
            "Update your DMARC TXT record at _dmarc.yourdomain.com. Start with a percentage-based approach, e.g., 'v=DMARC1; p=quarantine; pct=10; rua=mailto:dmarc@yourdomain.com'",
          estimatedTime: "5-10 minutes",
        },
        {
          title: "Gradually increase enforcement",
          description: "Incrementally increase the percentage and strength of your DMARC policy over time.",
          technicalDescription:
            "Gradually increase the pct value (e.g., 10%, 25%, 50%, 100%) and eventually move from p=quarantine to p=reject as you confirm there are no issues with legitimate email.",
          estimatedTime: "Several weeks (incremental process)",
        },
      ],
    },
    "ssl-issue": {
      id: "ssl-issue",
      title: "Expiring SSL Certificate",
      description: "Your SSL certificate is expiring soon.",
      severity: "warning",
      detectedDate: "May 6, 2023",
      recommendation: "Renew your SSL certificate before it expires to maintain secure email communications.",
      simpleExplanation:
        "An SSL certificate secures the connection between your mail server and your users. If it expires, email clients may show security warnings.",
      technicalDetails:
        "SSL/TLS certificates are used to encrypt SMTP, IMAP, and POP3 connections for email. An expired certificate can cause connection issues and security warnings.",
      estimatedTime: "30-60 minutes",
      steps: [
        {
          title: "Identify your certificate provider",
          description: "Determine which certificate authority (CA) issued your current SSL certificate.",
          technicalDescription:
            "Check your current certificate details to identify the issuer (CA) and the exact domains covered.",
          estimatedTime: "5-10 minutes",
        },
        {
          title: "Generate a new CSR if needed",
          description: "Create a Certificate Signing Request (CSR) for your mail server.",
          technicalDescription:
            "Generate a new CSR using your web server or mail server software. Ensure the Common Name (CN) matches your mail server hostname.",
          estimatedTime: "10-15 minutes",
        },
        {
          title: "Purchase or renew your certificate",
          description: "Contact your certificate provider to renew or purchase a new SSL certificate.",
          technicalDescription:
            "Submit your CSR to your chosen certificate authority and complete the validation process they require.",
          estimatedTime: "10-30 minutes (plus waiting time for validation)",
        },
        {
          title: "Install the new certificate",
          description: "Install the renewed certificate on your mail server.",
          technicalDescription:
            "Install the certificate, private key, and any intermediate certificates on your mail server according to your server software's documentation.",
          estimatedTime: "10-15 minutes",
        },
        {
          title: "Test the certificate",
          description: "Verify that the new certificate is working correctly.",
          technicalDescription:
            "Use tools like SSL Labs or OpenSSL to verify the certificate is properly installed, valid, and trusted.",
          estimatedTime: "5-10 minutes",
        },
      ],
    },
  }

  const issue = issues[params.issueId as keyof typeof issues]

  if (!issue) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold">Issue not found</h1>
        <p className="mt-4">The requested issue could not be found.</p>
        <Button className="mt-4" asChild>
          <Link href="/email-deliverability">Back to Email Deliverability</Link>
        </Button>
      </div>
    )
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
              <Shield className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Authentication Issue</h3>
                <p className="text-amber-700 text-sm">
                  This is a suggested plan to fix your email authentication. These changes need to be implemented
                  manually by your email administrator.
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
                  Email authentication is crucial for deliverability. Properly configured authentication methods help
                  ensure your emails reach their intended recipients and aren't marked as spam.
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

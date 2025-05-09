"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  AlertCircle,
  AlertTriangle,
  Info,
  Printer,
  Forward,
  HelpCircle,
  MonitorSmartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample fix steps for different issue types
const fixSteps = {
  "ssl-expiring": [
    { id: 1, name: "Validating domain ownership", time: 15 },
    { id: 2, name: "Generating new certificate", time: 20 },
    { id: 3, name: "Installing certificate", time: 10 },
    { id: 4, name: "Verifying installation", time: 5 },
  ],
  "mixed-content": [
    { id: 1, name: "Scanning for mixed content", time: 10 },
    { id: 2, name: "Identifying HTTP resources", time: 15 },
    { id: 3, name: "Updating resource URLs to HTTPS", time: 20 },
    { id: 4, name: "Verifying changes", time: 10 },
  ],
  "dns-resolution": [
    { id: 1, name: "Analyzing DNS configuration", time: 10 },
    { id: 2, name: "Optimizing DNS settings", time: 15 },
    { id: 3, name: "Updating DNS records", time: 20 },
    { id: 4, name: "Verifying DNS propagation", time: 180 }, // DNS propagation can take hours; using 3 hours here
  ],
  "missing-records": [
    { id: 1, name: "Analyzing missing DNS records", time: 10 },
    { id: 2, name: "Generating SPF record", time: 15 },
    { id: 3, name: "Generating DMARC record", time: 15 },
    { id: 4, name: "Adding records to DNS", time: 20 },
    { id: 5, name: "Verifying record propagation", time: 180 }, // DNS propagation can take hours
  ],
  "high-ttfb": [
    { id: 1, name: "Analyzing server response time", time: 15 },
    { id: 2, name: "Configuring server caching", time: 25 },
    { id: 3, name: "Optimizing database queries", time: 45 },
    { id: 4, name: "Verifying improvements", time: 20 },
  ],
  "server-errors": [
    { id: 1, name: "Analyzing server logs", time: 30 },
    { id: 2, name: "Identifying error sources", time: 45 },
    { id: 3, name: "Applying fixes", time: 60 },
    { id: 4, name: "Restarting affected services", time: 15 },
    { id: 5, name: "Verifying resolution", time: 30 },
  ],
  "slow-loading": [
    { id: 1, name: "Analyzing page load times", time: 20 },
    { id: 2, name: "Optimizing JavaScript", time: 45 },
    { id: 3, name: "Implementing lazy loading", time: 30 },
    { id: 4, name: "Configuring browser caching", time: 20 },
    { id: 5, name: "Verifying improvements", time: 15 },
  ],
  "large-images": [
    { id: 1, name: "Scanning for large images", time: 15 },
    { id: 2, name: "Optimizing image sizes", time: 30 },
    { id: 3, name: "Converting to WebP format", time: 20 },
    { id: 4, name: "Implementing responsive images", time: 20 },
    { id: 5, name: "Verifying improvements", time: 15 },
  ],
  // Default steps for any other issue
  default: [
    { id: 1, name: "Analyzing issue", time: 20 },
    { id: 2, name: "Preparing fix", time: 30 },
    { id: 3, name: "Applying changes", time: 45 },
    { id: 4, name: "Verifying resolution", time: 20 },
  ],
}

// Non-technical explanations for each issue type
const nonTechnicalExplanations = {
  "ssl-expiring": {
    title: "SSL Certificate Renewal Guide",
    description:
      "Your website's security certificate is about to expire. This is like having a store permit that needs to be renewed regularly to stay in business.",
    steps: [
      "We will verify that you own the domain to make sure we're securing the right website.",
      "A new security certificate will be generated for your website.",
      "We'll install this new certificate on your server, which is like putting a new lock on your door.",
      "Finally, we'll check that everything is working properly so visitors see your site is secure.",
    ],
    additionalInfo:
      "Keeping your SSL certificate up-to-date is crucial for security and user trust. Without a valid certificate, browsers will show warning messages to visitors, causing many to leave your site immediately.",
  },

  "mixed-content": {
    title: "Mixed Content Repair Guide",
    description:
      "Your secure website is loading some insecure content. This is like having a secure building with a few windows left unlocked.",
    steps: [
      "We'll scan your website to find all the insecure content.",
      "We'll identify exactly which resources (images, scripts, etc.) are being loaded insecurely.",
      "All resource links will be updated to use secure connections (HTTPS instead of HTTP).",
      "We'll check that everything now loads securely to ensure your site is fully protected.",
    ],
    additionalInfo:
      "Mixed content issues occur when your secure (HTTPS) pages load some resources through insecure (HTTP) connections. This can trigger browser warnings and compromise security benefits of HTTPS.",
  },

  "dns-resolution": {
    title: "DNS Performance Improvement Guide",
    description:
      "Your domain is taking too long to resolve. It's like having an address that's difficult for delivery services to locate.",
    steps: [
      "We'll examine your current DNS setup to identify performance bottlenecks.",
      "We'll make adjustments to your DNS settings to improve speed.",
      "The optimized settings will be applied to your domain's DNS records.",
      "We'll verify that your domain now resolves faster for visitors.",
    ],
    additionalInfo:
      "Slow DNS resolution increases the time it takes for visitors to reach your website. Faster DNS means visitors can access your site more quickly, improving user experience.",
  },

  "missing-records": {
    title: "DNS Records Setup Guide",
    description:
      "Your domain is missing important email security records. This makes it easier for scammers to send fake emails that appear to come from your company.",
    steps: [
      "We'll analyze which specific DNS records are missing from your domain.",
      "We'll create a properly formatted SPF record for your domain to verify email senders.",
      "We'll generate a DMARC record to protect against email spoofing and phishing.",
      "These records will be added to your domain's DNS settings.",
      "We'll check that the records are working correctly across the internet.",
    ],
    additionalInfo:
      "SPF and DMARC records help email providers verify if messages actually came from your domain. Without these, spammers can more easily pretend to be your organization in phishing attempts.",
  },

  "high-ttfb": {
    title: "Server Response Optimization Guide",
    description:
      "Your server takes too long to begin sending data. This is like a waiter who takes a long time to acknowledge you're in the restaurant.",
    steps: [
      "We'll analyze what's causing your server to respond slowly.",
      "We'll implement caching to store frequently accessed data for quicker retrieval.",
      "We'll optimize database queries to make them more efficient.",
      "We'll verify that your server now responds more quickly to requests.",
    ],
    additionalInfo:
      "Server response time (TTFB) is the time it takes for your server to send the first byte of data. Reducing this time improves perceived page load speed and user experience.",
  },

  "server-errors": {
    title: "Server Error Resolution Guide",
    description:
      "Some pages on your website are showing error messages instead of content. This is like finding 'Out of Order' signs on doors in a building.",
    steps: [
      "We'll examine your server logs to understand the cause of these errors.",
      "We'll identify the specific issues causing the errors on your pages.",
      "We'll implement the necessary fixes to resolve these problems.",
      "We'll restart the affected services to apply the changes.",
      "We'll check that your pages now load correctly without errors.",
    ],
    additionalInfo:
      "Server errors (5xx) indicate problems on the server rather than with the visitor's browser. These errors prevent access to content and can significantly harm user experience and SEO.",
  },

  "slow-loading": {
    title: "Page Speed Optimization Guide",
    description:
      "Your pages are taking too long to load. This is like a slow app that makes users wait and potentially leave.",
    steps: [
      "We'll analyze which elements are causing your pages to load slowly.",
      "We'll optimize JavaScript code to improve execution speed.",
      "We'll implement lazy loading so images and content only load when needed.",
      "We'll set up browser caching so returning visitors experience faster loading.",
      "We'll verify that your pages now load more quickly.",
    ],
    additionalInfo:
      "Page load time directly impacts user experience and search rankings. Most users abandon sites that take more than 3 seconds to load, and Google uses page speed as a ranking factor.",
  },

  "large-images": {
    title: "Image Optimization Guide",
    description:
      "Your website has images that are much larger than they need to be. It's like sending a truck to deliver a small package.",
    steps: [
      "We'll identify all the oversized images on your website.",
      "We'll resize and compress these images to optimal dimensions and file sizes.",
      "We'll convert images to modern formats like WebP that provide better compression.",
      "We'll implement responsive images that adapt to different screen sizes.",
      "We'll check that your pages now load faster with the optimized images.",
    ],
    additionalInfo:
      "Large, unoptimized images are one of the most common causes of slow websites. Properly optimized images can reduce page load times dramatically while maintaining visual quality.",
  },

  // Default explanation for any other issue
  default: {
    title: "Issue Resolution Guide",
    description: "We've detected an issue that needs to be fixed on your website.",
    steps: [
      "We'll analyze the specific issue affecting your website.",
      "We'll prepare the appropriate solution based on our analysis.",
      "We'll apply the necessary changes to resolve the issue.",
      "We'll verify that everything is now working correctly.",
    ],
    additionalInfo:
      "Regularly addressing technical issues helps maintain optimal website performance, security, and user experience.",
  },
}

// Sample issue data
const issueData = {
  "ssl-expiring": {
    title: "SSL certificate expiring soon",
    description: "Your SSL certificate will expire in 15 days.",
    impact: "high",
    complexity: "medium",
    estimatedTime: "10-15 minutes",
  },
  "mixed-content": {
    title: "Mixed content issues",
    description: "7 pages load insecure (HTTP) resources on secure (HTTPS) pages.",
    impact: "medium",
    complexity: "medium",
    estimatedTime: "15-20 minutes",
  },
  "dns-resolution": {
    title: "Slow DNS resolution",
    description: "Your domain's DNS resolution is taking 350ms, which is slower than recommended.",
    impact: "medium",
    complexity: "medium",
    estimatedTime: "10-15 minutes",
  },
  "missing-records": {
    title: "Missing DNS records",
    description: "Your domain is missing important DNS records (DMARC, SPF).",
    impact: "high",
    complexity: "medium",
    estimatedTime: "15-20 minutes",
  },
  "high-ttfb": {
    title: "Excessive server response time",
    description: "Your server takes too long to respond (TTFB: 1.2s), well above the recommended 600ms.",
    impact: "high",
    complexity: "high",
    estimatedTime: "20-30 minutes",
  },
  "server-errors": {
    title: "Server errors detected",
    description: "3 URLs are returning 5xx server errors, indicating server-side problems.",
    impact: "high",
    complexity: "high",
    estimatedTime: "25-35 minutes",
  },
  "slow-loading": {
    title: "Slow page loading times",
    description: "Several pages have loading times over 3 seconds.",
    impact: "high",
    complexity: "medium",
    estimatedTime: "15-25 minutes",
  },
  "large-images": {
    title: "Unoptimized images",
    description: "12 images are unnecessarily large and slowing down your pages.",
    impact: "medium",
    complexity: "low",
    estimatedTime: "10-15 minutes",
  },
}

export default function FixIssuePage() {
  const params = useParams()
  const router = useRouter()
  const issueId = params.issueId as string

  const [activeTab, setActiveTab] = useState<"technical" | "non-technical">("non-technical")
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("fixing")

  const steps = fixSteps[issueId as keyof typeof fixSteps] || fixSteps.default
  const issue = issueData[issueId as keyof typeof issueData] || {
    title: "Unknown Issue",
    description: "This issue needs to be fixed.",
    impact: "medium",
    complexity: "medium",
    estimatedTime: "10-15 minutes",
  }
  const nonTechnical =
    nonTechnicalExplanations[issueId as keyof typeof nonTechnicalExplanations] || nonTechnicalExplanations.default

  const handleRetry = () => {
    setCurrentStep(1)
    setProgress(0)
    setStatus("fixing")
  }

  const handleBack = () => {
    router.push("/server-health")
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-orange-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-600"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-orange-500"
      case "low":
        return "text-yellow-500"
      default:
        return "text-gray-600"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "low":
        return <Info className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const handlePrintSteps = () => {
    window.print()
  }

  const handleForwardSteps = () => {
    // In a real app, this would open a share dialog or email form
    alert("This would open a dialog to forward these recommendations to your IT team or support staff")
  }

  const handleIgnore = () => {
    router.push("/server-health")
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="mr-4">{getImpactIcon(issue.impact)}</div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#323048]">Server Health Report for {issue.title}</h1>
            <div className="flex items-center text-sm text-[#7D8496] mt-1">
              <span>Detected on: {new Date().toLocaleString()}</span>
              <span className="mx-2">•</span>
              <span>ID: {issueId}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={handleBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{issue.title}</CardTitle>
              <CardDescription>{issue.description}</CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <Badge
                className={`mb-2 ${
                  issue.impact === "high"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : issue.impact === "medium"
                      ? "bg-orange-100 text-orange-800 border-orange-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }`}
              >
                {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)} Impact
              </Badge>
              <span className="text-sm text-gray-500">Detected {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Impact</span>
              <span className={`font-medium ${getImpactColor(issue.impact)}`}>
                {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Complexity</span>
              <span className={`font-medium ${getComplexityColor(issue.complexity)}`}>
                {issue.complexity.charAt(0).toUpperCase() + issue.complexity.slice(1)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Estimated Time</span>
              <span className="font-medium">{issue.estimatedTime}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Suggested Fix Plan</h3>
                <p className="text-amber-700 text-sm">
                  This is a preview of the recommended fix process. Actual implementation would require manual action or
                  scheduling through your server administrator.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Recommended Fix Steps</h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center p-3 rounded-md bg-gray-50 border border-gray-200">
                  <div className="mr-3">
                    <div className="h-5 w-5 rounded-full bg-[#537AEF] text-white flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.name}</div>
                    <div className="text-xs text-gray-500">
                      Estimated time: {step.time} {step.time === 1 ? "minute" : "minutes"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3 pt-2 border-t">
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={handlePrintSteps}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print steps
              </Button>

              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto" onClick={handleIgnore}>
                  Dismiss
                </Button>
                <Button
                  className="w-full sm:w-auto bg-[#537AEF] hover:bg-[#537AEF]/90 flex items-center justify-center"
                  onClick={handleForwardSteps}
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Forward to IT team
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="non-technical"
        onValueChange={(value) => setActiveTab(value as "technical" | "non-technical")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="non-technical">Non-Technical Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
        </TabsList>

        <TabsContent value="non-technical">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <MonitorSmartphone className="h-5 w-5 text-[#537AEF] mr-2" />
                <CardTitle>{nonTechnical.title}</CardTitle>
              </div>
              <CardDescription className="text-base">
                Here's a step-by-step guide to understand this issue on your site.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{nonTechnical.description}</p>

                <h4 className="text-lg font-medium mb-3">What needs to be done to fix this:</h4>
                <div className="space-y-3 mb-6">
                  {nonTechnical.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#537AEF] text-white flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="text-blue-700 font-medium mb-2 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Good to know
                  </h4>
                  <p className="text-blue-700 text-sm">{nonTechnical.additionalInfo}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-2 border-t">
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={handlePrintSteps}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print explanation
              </Button>

              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto" onClick={handleIgnore}>
                  Dismiss
                </Button>
                <Button
                  className="w-full sm:w-auto bg-[#537AEF] hover:bg-[#537AEF]/90 flex items-center justify-center"
                  onClick={handleForwardSteps}
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Forward to support
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
              <CardDescription>
                Detailed technical information about this issue and the recommended fix process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Issue Detection</h3>
                  <p className="text-gray-700 mb-2">
                    This issue was detected through automated scanning of your server health metrics. Our system
                    identified abnormal patterns in your{" "}
                    {issueId.includes("ssl")
                      ? "SSL configuration"
                      : issueId.includes("dns")
                        ? "DNS settings"
                        : issueId.includes("server")
                          ? "server responses"
                          : "performance metrics"}
                    .
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Fix Details</h3>
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <div key={step.id} className="border border-gray-200 rounded-md p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">
                            Step {index + 1}: {step.name}
                          </h4>
                          <span className="text-sm text-gray-500">Est. time: {step.time} min</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {step.name.includes("Analyzing")
                            ? "Running diagnostics on affected components and collecting system data."
                            : step.name.includes("Generating")
                              ? "Creating new configuration based on best practices and security standards."
                              : step.name.includes("Optimizing")
                                ? "Adjusting parameters for improved performance based on system analysis."
                                : step.name.includes("Verifying")
                                  ? "Running tests to ensure changes have been successfully applied."
                                  : step.name.includes("Installing")
                                    ? "Deploying new components and configurations to the server."
                                    : step.name.includes("Updating")
                                      ? "Modifying existing settings to resolve the detected issues."
                                      : step.name.includes("Configuring")
                                        ? "Setting up new parameters to optimize system behavior."
                                        : step.name.includes("Scanning")
                                          ? "Inspecting system for all instances of the issue."
                                          : step.name.includes("Identifying")
                                            ? "Locating specific problematic elements in your configuration."
                                            : step.name.includes("Implementing")
                                              ? "Adding new functionality to address the root cause."
                                              : "Applying automated fixes based on issue analysis."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">System Impact</h3>
                  <p className="text-gray-700">
                    This fix would adjust configuration files and settings related to your
                    {issueId.includes("ssl")
                      ? " SSL certificate and security settings"
                      : issueId.includes("dns")
                        ? " DNS configuration and network settings"
                        : issueId.includes("server")
                          ? " server infrastructure and response handling"
                          : issueId.includes("image")
                            ? " content delivery and image processing"
                            : " system performance and optimization parameters"}
                    . No data would be lost during this process.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <h3 className="text-lg font-medium mb-2">Manual Implementation</h3>
                  <p className="text-gray-700 mb-3">
                    To implement this fix manually, your server administrator would need to:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>Access the server configuration through SSH or control panel</li>
                    <li>Make a backup of the current configuration</li>
                    <li>Apply the changes described in the technical fix details</li>
                    <li>Test the changes in a staging environment if possible</li>
                    <li>Deploy the changes to production</li>
                    <li>Verify the issue has been resolved</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

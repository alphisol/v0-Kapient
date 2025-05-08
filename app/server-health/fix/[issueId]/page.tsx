"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Sample fix steps for different issue types
const fixSteps = {
  "ssl-expiring": [
    { id: 1, name: "Validating domain ownership", time: 2 },
    { id: 2, name: "Generating new certificate", time: 5 },
    { id: 3, name: "Installing certificate", time: 3 },
    { id: 4, name: "Verifying installation", time: 2 },
  ],
  "mixed-content": [
    { id: 1, name: "Scanning for mixed content", time: 3 },
    { id: 2, name: "Identifying HTTP resources", time: 2 },
    { id: 3, name: "Updating resource URLs to HTTPS", time: 4 },
    { id: 4, name: "Verifying changes", time: 2 },
  ],
  "dns-resolution": [
    { id: 1, name: "Analyzing DNS configuration", time: 2 },
    { id: 2, name: "Optimizing DNS settings", time: 3 },
    { id: 3, name: "Updating DNS records", time: 4 },
    { id: 4, name: "Verifying DNS propagation", time: 5 },
  ],
  "missing-records": [
    { id: 1, name: "Analyzing missing DNS records", time: 2 },
    { id: 2, name: "Generating SPF record", time: 3 },
    { id: 3, name: "Generating DMARC record", time: 3 },
    { id: 4, name: "Adding records to DNS", time: 4 },
    { id: 5, name: "Verifying record propagation", time: 5 },
  ],
  "high-ttfb": [
    { id: 1, name: "Analyzing server response time", time: 2 },
    { id: 2, name: "Configuring server caching", time: 4 },
    { id: 3, name: "Optimizing database queries", time: 5 },
    { id: 4, name: "Verifying improvements", time: 3 },
  ],
  "server-errors": [
    { id: 1, name: "Analyzing server logs", time: 3 },
    { id: 2, name: "Identifying error sources", time: 4 },
    { id: 3, name: "Applying fixes", time: 5 },
    { id: 4, name: "Restarting affected services", time: 2 },
    { id: 5, name: "Verifying resolution", time: 3 },
  ],
  "slow-loading": [
    { id: 1, name: "Analyzing page load times", time: 2 },
    { id: 2, name: "Optimizing JavaScript", time: 4 },
    { id: 3, name: "Implementing lazy loading", time: 3 },
    { id: 4, name: "Configuring browser caching", time: 3 },
    { id: 5, name: "Verifying improvements", time: 2 },
  ],
  "large-images": [
    { id: 1, name: "Scanning for large images", time: 2 },
    { id: 2, name: "Optimizing image sizes", time: 5 },
    { id: 3, name: "Converting to WebP format", time: 3 },
    { id: 4, name: "Implementing responsive images", time: 3 },
    { id: 5, name: "Verifying improvements", time: 2 },
  ],
  // Default steps for any other issue
  default: [
    { id: 1, name: "Analyzing issue", time: 3 },
    { id: 2, name: "Preparing fix", time: 4 },
    { id: 3, name: "Applying changes", time: 5 },
    { id: 4, name: "Verifying resolution", time: 3 },
  ],
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

  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"fixing" | "success" | "failed">("fixing")
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  const steps = fixSteps[issueId as keyof typeof fixSteps] || fixSteps.default
  const issue = issueData[issueId as keyof typeof issueData] || {
    title: "Unknown Issue",
    description: "This issue needs to be fixed.",
    impact: "medium",
    complexity: "medium",
    estimatedTime: "10-15 minutes",
  }

  const totalSteps = steps.length
  const totalTime = steps.reduce((acc, step) => acc + step.time, 0)

  useEffect(() => {
    // Simulate the fix process
    if (status === "fixing" && currentStep <= totalSteps) {
      const currentStepTime = steps[currentStep - 1].time * 1000
      const timer = setTimeout(() => {
        // Random chance of failure (10%)
        if (Math.random() < 0.1 && currentStep === totalSteps) {
          setStatus("failed")
          return
        }

        if (currentStep < totalSteps) {
          setCurrentStep(currentStep + 1)
          setProgress(Math.round((currentStep / totalSteps) * 100))
        } else {
          setProgress(100)
          setStatus("success")
        }
      }, currentStepTime)

      // Update time remaining
      const remainingSteps = steps.slice(currentStep - 1)
      const remainingTime = remainingSteps.reduce((acc, step) => acc + step.time, 0)
      setTimeRemaining(remainingTime)

      return () => clearTimeout(timer)
    }
  }, [currentStep, status, steps, totalSteps])

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

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <Button variant="outline" className="mb-6" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Server Health
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Fixing: {issue.title}</CardTitle>
          <CardDescription>{issue.description}</CardDescription>
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

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-gray-800" />
          </div>

          {status === "fixing" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Estimated time remaining: {timeRemaining} seconds</span>
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isCurrentStep = index + 1 === currentStep
                  const isCompleted = index + 1 < currentStep

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center p-3 rounded-md ${
                        isCurrentStep
                          ? "bg-blue-50 border border-blue-200"
                          : isCompleted
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="mr-3">
                        {isCurrentStep ? (
                          <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                        ) : isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.name}</div>
                        <div className="text-xs text-gray-500">
                          {isCompleted
                            ? "Completed"
                            : isCurrentStep
                              ? "In progress..."
                              : `Estimated time: ${step.time} seconds`}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Fix Successfully Applied!</h3>
              <p className="text-gray-600 mb-6">
                The issue has been successfully fixed. Your server health should improve shortly.
              </p>
              <Button onClick={handleBack}>Return to Dashboard</Button>
            </div>
          )}

          {status === "failed" && (
            <div className="text-center py-6">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-700 mb-2">Fix Failed</h3>
              <p className="text-gray-600 mb-6">
                We encountered an error while trying to fix this issue. Please try again or contact support.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleBack}>
                  Back to Dashboard
                </Button>
                <Button onClick={handleRetry}>Try Again</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

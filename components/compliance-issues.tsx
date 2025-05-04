import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ComplianceIssues() {
  const complianceData = [
    {
      id: "wcag",
      title: "WCAG Accessibility",
      status: "partial",
      score: 78,
      issues: [
        "Missing alt text on 12 images",
        "Insufficient color contrast on 5 elements",
        "Missing ARIA labels on 3 interactive elements",
      ],
    },
    {
      id: "gdpr",
      title: "GDPR Compliance",
      status: "partial",
      score: 85,
      issues: ["Cookie consent banner not implemented", "Privacy policy missing required GDPR sections"],
    },
    {
      id: "ccpa",
      title: "CCPA Compliance",
      status: "non-compliant",
      score: 45,
      issues: [
        "No 'Do Not Sell My Personal Information' link",
        "Missing CCPA disclosures in privacy policy",
        "No mechanism for users to request data deletion",
      ],
    },
  ]

  const statusIcon = {
    compliant: <CheckCircle className="h-5 w-5 text-green-500" />,
    partial: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    "non-compliant": <AlertTriangle className="h-5 w-5 text-red-500" />,
  }

  const statusText = {
    compliant: "Compliant",
    partial: "Partially Compliant",
    "non-compliant": "Non-Compliant",
  }

  const statusColor = {
    compliant: "text-green-600 bg-green-50 border-green-200",
    partial: "text-yellow-600 bg-yellow-50 border-yellow-200",
    "non-compliant": "text-red-600 bg-red-50 border-red-200",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {complianceData.map((item) => (
        <Card key={item.id} className={`border-l-4 ${statusColor[item.status]}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              {statusIcon[item.status]}
            </div>
            <div className="flex items-center mt-1">
              <span
                className={`text-sm font-medium ${item.status === "compliant" ? "text-green-600" : item.status === "partial" ? "text-yellow-600" : "text-red-600"}`}
              >
                {statusText[item.status]}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600">{item.score}% Score</span>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="text-sm font-medium mb-2">Issues Found:</h4>
            <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5 mb-4">
              {item.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
            <Button size="sm" className="w-full bg-kapient-blue hover:bg-kapient-blue/90">
              Fix Compliance Issues
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

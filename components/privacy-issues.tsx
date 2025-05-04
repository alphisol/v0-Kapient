import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Cookie, Eye, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrivacyIssues() {
  const privacyData = [
    {
      id: "cookies",
      title: "Cookie Usage",
      icon: Cookie,
      issues: [
        "3 tracking cookies set without consent",
        "Cookie banner not implemented",
        "No option to reject non-essential cookies",
      ],
    },
    {
      id: "tracking",
      title: "User Tracking",
      icon: Eye,
      issues: [
        "Google Analytics configured without anonymized IP",
        "Facebook Pixel tracking all users without consent",
        "No opt-out mechanism for analytics",
      ],
    },
    {
      id: "data-protection",
      title: "Data Protection",
      icon: Shield,
      issues: [
        "Contact form data stored without encryption",
        "No data retention policy implemented",
        "User data shared with third parties without explicit consent",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {privacyData.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-kapient-blue" />
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium text-red-500">{item.issues.length} issues</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5 mb-4">
              {item.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
            <Button size="sm" className="w-full bg-kapient-blue hover:bg-kapient-blue/90">
              Resolve Issues
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

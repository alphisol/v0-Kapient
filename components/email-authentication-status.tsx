"use client"

import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EmailAuthenticationStatusProps {
  domain: string
}

export function EmailAuthenticationStatus({ domain }: EmailAuthenticationStatusProps) {
  // This would be fetched from an API in a real implementation
  const authStatus = {
    spf: {
      status: "valid", // valid, invalid, missing
      record: "v=spf1 include:_spf.google.com ~all",
      description: "SPF record is properly configured and allows Google to send emails on your behalf.",
    },
    dkim: {
      status: "missing", // valid, invalid, missing
      record: "",
      description: "DKIM record is missing. This authentication method helps prevent email spoofing.",
    },
    dmarc: {
      status: "invalid", // valid, invalid, missing
      record: "v=DMARC1; p=none; rua=mailto:dmarc@example.com",
      description: "DMARC policy is set to 'none', which only monitors but doesn't protect against spoofing.",
    },
    ssl: {
      status: "valid", // valid, invalid, missing, expiring
      record: "Valid until Dec 15, 2023",
      description: "SSL certificate is valid and not expiring soon.",
    },
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "invalid":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "missing":
      case "expiring":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Valid"
      case "invalid":
        return "Invalid"
      case "missing":
        return "Missing"
      case "expiring":
        return "Expiring Soon"
      default:
        return "Unknown"
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "valid":
        return "text-green-500"
      case "invalid":
        return "text-amber-500"
      case "missing":
      case "expiring":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {Object.entries(authStatus).map(([key, value]) => (
        <Card key={key} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="mr-3">{getStatusIcon(value.status)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">
                    {key.toUpperCase()}{" "}
                    <span className={getStatusClass(value.status)}>({getStatusText(value.status)})</span>
                  </h3>
                  {value.status !== "valid" && (
                    <Button size="sm" className="text-xs">
                      Fix Now
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{value.description}</p>
                {value.record && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono overflow-x-auto">{value.record}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

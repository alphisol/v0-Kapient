import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SecurityScanResultsProps {
  lastScan: string
}

export function SecurityScanResults({ lastScan }: SecurityScanResultsProps) {
  const vulnerabilityData = [
    { type: "SQL Injection", count: 3, color: "bg-red-400" },
    { type: "XSS", count: 5, color: "bg-teal-500" },
    { type: "CSRF", count: 1, color: "bg-gray-700" },
    { type: "Outdated Libraries", count: 7, color: "bg-yellow-400" },
    { type: "Insecure HTTP", count: 3, color: "bg-orange-400" },
  ]

  // Find the maximum count to scale the bars
  const maxCount = Math.max(...vulnerabilityData.map((item) => item.count))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Security Scan Results</CardTitle>
        <p className="text-xs text-gray-500">Last scan: {lastScan}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            {vulnerabilityData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{item.type}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">Summary</h4>
            <div className="grid grid-cols-2 gap-2">
              {vulnerabilityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span>
                    {item.type}: {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

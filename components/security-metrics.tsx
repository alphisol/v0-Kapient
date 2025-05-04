import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Info } from "lucide-react"

export function SecurityMetrics() {
  const metrics = [
    {
      title: "Security Score",
      value: "72/100",
      change: "+5 from last month",
      progress: 72,
      trend: "positive",
    },
    {
      title: "Vulnerabilities",
      value: "7",
      change: "-3 from last month",
      progress: 0,
      trend: "positive",
    },
    {
      title: "GDPR Compliance",
      value: "85%",
      change: "No change from last month",
      progress: 85,
      trend: "neutral",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                <p className="text-3xl font-bold mt-1">{metric.value}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Info className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-1 text-xs">
              <span
                className={`${metric.trend === "positive" ? "text-green-500" : metric.trend === "negative" ? "text-red-500" : "text-gray-500"}`}
              >
                {metric.trend === "positive" ? "↑ " : metric.trend === "negative" ? "↓ " : "• "}
                {metric.change}
              </span>
            </div>

            {metric.progress > 0 && (
              <Progress
                value={metric.progress}
                className="h-2 mt-4"
                indicatorClassName={
                  metric.trend === "positive"
                    ? "bg-green-500"
                    : metric.trend === "negative"
                      ? "bg-red-500"
                      : "bg-blue-500"
                }
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlatformReviews } from "@/components/platform-reviews"

interface EmailReputationSectionProps {
  domain: string
}

export function EmailReputationSection({ domain }: EmailReputationSectionProps) {
  // Mock data for review scores by month
  const monthlyScores = [
    { month: "Jan", score: 4.8 },
    { month: "Feb", score: 4.7 },
    { month: "Mar", score: 4.9 },
    { month: "Apr", score: 4.8 },
    { month: "May", score: 4.9 },
  ]

  // Calculate percentages for the rating bars
  const ratings = [5, 4, 3, 2, 1]
  const ratingCounts = [78, 42, 12, 5, 3]
  const totalReviews = ratingCounts.reduce((sum, count) => sum + count, 0)
  const ratingPercentages = ratingCounts.map((count) => (count / totalReviews) * 100)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Engagement & Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <PlatformReviews />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Review Score by Month</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="h-full flex items-center justify-center">
            <div className="w-full space-y-4">
              {ratings.map((rating, index) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm font-medium w-6">★ {rating}</span>
                  <div className="h-2 bg-gray-100 flex-1 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        rating > 3 ? "bg-green-500" : rating === 3 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${ratingPercentages[index]}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{ratingCounts[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

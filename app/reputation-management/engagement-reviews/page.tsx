import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewsAnalytics } from "@/components/reviews-analytics"
import { PlatformReviews } from "@/components/platform-reviews"
import { ReviewsList } from "@/components/reviews-list"

export default function EngagementReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Reviews Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewsAnalytics />
          </CardContent>
        </Card>

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
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm font-medium">★ {rating}</span>
                      <div className="h-2 bg-gray-100 flex-1 rounded-full">
                        <div
                          className={`h-full rounded-full ${
                            rating > 3 ? "bg-green-500" : rating === 3 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${rating * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reviews</CardTitle>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">Show More reviews</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
                >
                  <span className="text-amber-500">★</span> {rating}
                </button>
              ))}
            </div>
            <ReviewsList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

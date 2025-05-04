"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReviewsAnalytics() {
  const [activeTab, setActiveTab] = useState("rating-trend")

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Reviews Analytics</h2>

      <Tabs defaultValue="rating-trend" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="rating-trend">Rating Trend</TabsTrigger>
          <TabsTrigger value="rating-distribution">Rating Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="rating-trend">
          <div className="h-[300px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                {/* Grid lines */}
                <g stroke="#e5e7eb" strokeWidth="1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line key={`v-${i}`} x1={i * 70} y1="0" x2={i * 70} y2="300" />
                  ))}
                </g>

                {/* Average Rating Line */}
                <path
                  d="M50,80 L120,70 L190,90 L260,60 L330,50 L400,50 L470,60 L540,40 L610,50 L680,40 L750,30"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />
                {Array.from({ length: 11 }).map((_, i) => (
                  <circle
                    key={`c1-${i}`}
                    cx={50 + i * 70}
                    cy={[80, 70, 90, 60, 50, 50, 60, 40, 50, 40, 30][i]}
                    r="4"
                    fill="#4f46e5"
                  />
                ))}

                {/* Review Count Line */}
                <path
                  d="M50,240 L120,200 L190,220 L260,180 L330,160 L400,120 L470,140 L540,120 L610,100 L680,120 L750,80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                {Array.from({ length: 11 }).map((_, i) => (
                  <circle
                    key={`c2-${i}`}
                    cx={50 + i * 70}
                    cy={[240, 200, 220, 180, 160, 120, 140, 120, 100, 120, 80][i]}
                    r="4"
                    fill="#10b981"
                  />
                ))}

                {/* Y-axis labels */}
                <text x="10" y="10" fontSize="12" fill="#6b7280">
                  5
                </text>
                <text x="10" y="130" fontSize="12" fill="#6b7280">
                  2
                </text>
                <text x="10" y="250" fontSize="12" fill="#6b7280">
                  0
                </text>

                <text x="780" y="10" fontSize="12" fill="#6b7280">
                  35
                </text>
                <text x="780" y="130" fontSize="12" fill="#6b7280">
                  18
                </text>
                <text x="780" y="250" fontSize="12" fill="#6b7280">
                  0
                </text>

                {/* X-axis labels */}
                {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map(
                  (month, i) => (
                    <text key={month} x={50 + i * 70} y="290" fontSize="12" fill="#6b7280" textAnchor="middle">
                      {month}
                    </text>
                  ),
                )}

                {/* Legend */}
                <g transform="translate(350, 270)">
                  <circle cx="0" cy="0" r="4" fill="#4f46e5" />
                  <text x="10" y="4" fontSize="12" fill="#6b7280">
                    Avg. Rating
                  </text>
                  <circle cx="100" cy="0" r="4" fill="#10b981" />
                  <text x="110" y="4" fontSize="12" fill="#6b7280">
                    Review Count
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rating-distribution">
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Rating distribution chart will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReviewsAnalytics() {
  // Mock data for the line chart
  const lineData = [
    { month: "Jun", rating: 4.2, reviews: 8 },
    { month: "Jul", rating: 4.3, reviews: 12 },
    { month: "Aug", rating: 4.1, reviews: 10 },
    { month: "Sep", rating: 4.4, reviews: 15 },
    { month: "Oct", rating: 4.6, reviews: 18 },
    { month: "Nov", rating: 4.7, reviews: 22 },
    { month: "Dec", rating: 4.5, reviews: 20 },
    { month: "Jan", rating: 4.8, reviews: 25 },
    { month: "Feb", rating: 4.7, reviews: 23 },
    { month: "Mar", rating: 4.9, reviews: 28 },
    { month: "Apr", rating: 4.8, reviews: 26 },
    { month: "May", rating: 4.9, reviews: 30 },
  ]

  // Mock data for the bar chart
  const barData = [
    { name: "5 Stars", value: 87, color: "#10b981" },
    { name: "4 Stars", value: 32, color: "#60a5fa" },
    { name: "3 Stars", value: 14, color: "#fbbf24" },
    { name: "2 Stars", value: 6, color: "#f97316" },
    { name: "1 Star", value: 3, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="trend">
        <TabsList className="mb-4">
          <TabsTrigger value="trend">Rating Trend</TabsTrigger>
          <TabsTrigger value="distribution">Rating Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="trend" className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, "dataMax + 5"]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rating"
                stroke="#4f46e5"
                activeDot={{ r: 8 }}
                name="Avg. Rating"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="reviews"
                stroke="#10b981"
                name="Review Count"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="distribution" className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value) => [`${value} reviews`, ""]} />
              <Bar dataKey="value" name="Reviews" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}

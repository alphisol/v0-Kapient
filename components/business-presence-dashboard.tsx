"use client"

import { useState } from "react"
import { ArrowRight, ArrowUp, Check, MapPin, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Mock data for business listings
const businessListings = [
  {
    id: 1,
    platform: "Google Business Profile",
    businessName: "Acme Inc.",
    address: "123 Main St, New York, NY 10001",
    status: "Verified",
    rating: 4.7,
    reviews: 128,
    lastUpdated: "2023-12-15",
  },
  {
    id: 2,
    platform: "Yelp",
    businessName: "Acme Inc.",
    address: "123 Main St, New York, NY 10001",
    status: "Verified",
    rating: 4.2,
    reviews: 87,
    lastUpdated: "2023-12-10",
  },
  {
    id: 3,
    platform: "Facebook",
    businessName: "Acme Inc.",
    address: "123 Main St, New York, NY 10001",
    status: "Pending",
    rating: 4.5,
    reviews: 56,
    lastUpdated: "2023-12-05",
  },
  {
    id: 4,
    platform: "Bing Places",
    businessName: "Acme Inc.",
    address: "123 Main St, New York, NY 10001",
    status: "Verified",
    rating: 4.3,
    reviews: 42,
    lastUpdated: "2023-11-28",
  },
]

// Function to render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      <span className="mr-1 font-medium">{rating}</span>
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {hasHalfStar && <span>★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    </div>
  )
}

export function BusinessPresenceDashboard() {
  const [activeTab, setActiveTab] = useState("business-listings")

  // Calculate summary metrics
  const totalListings = businessListings.length
  const verifiedListings = businessListings.filter((listing) => listing.status === "Verified").length
  const totalReviews = businessListings.reduce((sum, listing) => sum + listing.reviews, 0)
  const averageRating = businessListings.reduce((sum, listing) => sum + listing.rating, 0) / businessListings.length
  const listingAccuracy = 92 // Mock percentage

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-kapient-darkgray">Business Presence</h1>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
            <span className="text-kapient-blue hover:underline cursor-pointer">Dashboard</span>
            <ArrowRight className="h-3 w-3 mx-2" />
            <span>Business Presence</span>
          </div>
        </div>
        <Button className="bg-kapient-blue hover:bg-kapient-blue/90">
          <Plus className="h-4 w-4 mr-2" /> Add Business Listing
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Total Listings</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold">{totalListings}</div>
              <div className="text-gray-500 text-sm">{verifiedListings} verified</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Total Reviews</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold">{totalReviews}</div>
              <div className="flex items-center text-kapient2-green text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                18 Last 30 days
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Average Rating</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="text-yellow-400">★★★★★</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Across all platforms</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Listing Accuracy</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-bold text-green-500">{listingAccuracy}%</div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${listingAccuracy}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">2 listings need updates</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="business-listings" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="business-listings" className="text-xs sm:text-sm">
            Business Listings
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs sm:text-sm">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs sm:text-sm">
            Insights
          </TabsTrigger>
          <TabsTrigger value="competitors" className="text-xs sm:text-sm">
            Competitors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-listings">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Business Listings</h2>
            <p className="text-gray-500 text-sm">Manage your business listings across different platforms</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="relative w-full sm:w-auto">
              <Input type="search" placeholder="Search listings..." className="pl-10 w-full sm:w-80" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="relative w-full sm:w-auto">
              <select className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-kapient-blue focus:border-kapient-blue">
                <option>All Statuses</option>
                <option>Verified</option>
                <option>Pending</option>
                <option>Needs Attention</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Listings Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Platform
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Business Info
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reviews
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {businessListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{listing.platform}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{listing.businessName}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        {listing.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={cn(
                          "px-2 py-1 text-xs font-medium",
                          listing.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800",
                        )}
                      >
                        {listing.status === "Verified" && <Check className="h-3 w-3 mr-1" />}
                        {listing.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StarRating rating={listing.rating} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.reviews}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Reviews</h3>
              <p className="text-gray-500">View and manage your reviews across all platforms.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Insights</h3>
              <p className="text-gray-500">Analyze your business presence performance.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competitors">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Competitors</h3>
              <p className="text-gray-500">Compare your business with competitors.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

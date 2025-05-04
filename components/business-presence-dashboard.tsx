"use client"

import { useState } from "react"
import { ArrowRight, ArrowUp, ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

export function BusinessPresenceDashboard() {
  const [activeTab, setActiveTab] = useState("business-listings")

  // Calculate summary metrics
  const totalListings = businessListings.length
  const verifiedListings = businessListings.filter((listing) => listing.status === "Verified").length
  const listingAccuracy = 82 // Mock percentage
  const listingIssues = 12

  return (
    <div className="container mx-auto p-4 md:p-6 pt-6">
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reputation Management</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Link href="/" className="text-kapient-blue hover:underline cursor-pointer">
            Dashboard
          </Link>
          <ArrowRight className="h-3 w-3 mx-2" />
          <span>Reputation Management</span>
        </div>
      </div>

      {/* Business Presence Title */}
      <h2 className="text-xl font-bold mb-6">Business Presence</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Listing Accuracy</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{listingAccuracy}%</div>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                5% Last 30 days
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Active Listings</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalListings}</div>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                +1 Last 30 days
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Verified Listings</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{verifiedListings}</div>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                +2 Last 30 days
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-1">Listing Issues</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{listingIssues}</div>
              <div className="flex items-center text-green-500 text-xs">
                <ArrowDown className="h-3 w-3 mr-1" />
                -3 Last 30 days
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Listing Accuracy Section */}
      <Card className="mb-8 border-yellow-200">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Business Listing Accuracy</h3>
            <p className="text-gray-500">Compare your business information with your online listings</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="text-center mb-2">
              <div className="text-sm font-medium text-gray-500">Listing Accuracy Score</div>
              <div className="text-5xl font-bold mt-2">64%</div>
              <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Critical Issues</Badge>
            </div>

            <p className="text-center max-w-2xl mt-4 text-gray-600">
              Your business listing accuracy affects how customers find you online. Address any discrepancies to improve
              your local SEO and customer experience.
            </p>

            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Listing
              </Button>
              <Button className="bg-kapient-blue hover:bg-kapient-blue/90">Update Listing</Button>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium mb-4">Business Information Comparison</h4>
            {/* Business information comparison would go here */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

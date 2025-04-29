"use client"

import { useState } from "react"
import { ArrowRight, ArrowUp, ArrowDown, Check, X, Info, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getScoreCardColor } from "@/lib/color-utils"
import { cn } from "@/lib/utils"

// Sample business data
const businessData = {
  listingAccuracy: 82,
  listingAccuracyChange: 5,
  activeListings: 8,
  activeListingsChange: 1,
  verifiedListings: 5,
  verifiedListingsChange: 2,
  listingIssues: 12,
  listingIssuesChange: -3,
  googleAccuracyScore: 64,

  yourBusiness: {
    name: "Acme Inc.",
    address: "123 Business Ave, Suite 101",
    city: "San Francisco",
    state: "CA",
    zipCode: "94107",
    phone: "(415) 555-1234",
    website: "https://www.acmeinc.com",
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    categories: ["Software", "Technology", "Consulting"],
  },

  googleListing: {
    name: "Acme Inc.",
    address: "123 Business Avenue, Suite 101",
    city: "San Francisco",
    state: "CA",
    zipCode: "94107",
    phone: "(415) 555-1235",
    website: "https://www.acmeinc.com",
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    categories: ["Software Company", "Technology Consultant", "IT Services"],
  },

  recommendations: [
    {
      type: "address",
      title: "Address format mismatch:",
      description: "Update your Business Profile to match your official address format.",
    },
    {
      type: "phone",
      title: "Phone number mismatch:",
      description:
        "Your phone number on your listing ((415) 555-1235) differs from your official number ((415) 555-1234).",
    },
    {
      type: "hours",
      title: "Business hours mismatch:",
      description: "Your Saturday hours on your listing (10:00 AM - 2:00 PM) differ from your official hours (Closed).",
    },
    {
      type: "category",
      title: "Category differences:",
      description:
        "Your business categories on your listing don't match your official categories. Consider updating for consistency.",
    },
  ],
}

export function BusinessPresenceDashboard() {
  const [activeTab, setActiveTab] = useState("business-presence")

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <span className="flex items-center text-kapient2-green text-xs">
          <ArrowUp className="h-3 w-3 mr-1" />
          {change}
        </span>
      )
    } else if (change < 0) {
      return (
        <span className="flex items-center text-red-600 text-xs">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(change)}
        </span>
      )
    } else {
      return <span className="text-gray-500 text-xs">-</span>
    }
  }

  const getFieldMatchStatus = (field1: string, field2: string) => {
    if (field1 === field2) {
      return <Check className="h-5 w-5 text-kapient2-green" />
    } else {
      return <X className="h-5 w-5 text-red-500" />
    }
  }

  // And update the getHoursMatchStatus function similarly:
  const getHoursMatchStatus = (day: string) => {
    const yourHours = businessData.yourBusiness.hours[day as keyof typeof businessData.yourBusiness.hours]
    const googleHours = businessData.googleListing.hours[day as keyof typeof businessData.googleListing.hours]

    if (yourHours === googleHours) {
      return <Check className="h-5 w-5 text-kapient2-green" />
    } else if (
      (yourHours === "Closed" && googleHours !== "Closed") ||
      (yourHours !== "Closed" && googleHours === "Closed")
    ) {
      return <X className="h-5 w-5 text-red-500" />
    } else {
      return <Info className="h-5 w-5 text-kapient2-amber" />
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-kapient-darkgray">Reputation Management</h1>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
            <span className="text-kapient-blue hover:underline cursor-pointer">Dashboard</span>
            <ArrowRight className="h-3 w-3 mx-2" />
            <span>Reputation Management</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="business-presence" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="platform-consistency" className="text-xs sm:text-sm">
            Platform Consistency
          </TabsTrigger>
          <TabsTrigger value="engagement-reviews" className="text-xs sm:text-sm">
            Engagement & Reviews
          </TabsTrigger>
          <TabsTrigger value="business-presence" className="text-xs sm:text-sm">
            Business Presence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-presence">
          <h2 className="text-xl font-bold mb-4">Business Presence</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <Card className={cn("border", getScoreCardColor(businessData.listingAccuracy))}>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Listing Accuracy</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl md:text-3xl font-bold">{businessData.listingAccuracy}%</div>
                  <div className="flex items-center text-kapient2-green text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {businessData.listingAccuracyChange}% Last 30 days
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Active Listings</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl md:text-3xl font-bold">{businessData.activeListings}</div>
                  <div className="flex items-center text-kapient2-green text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />+{businessData.activeListingsChange} Last 30 days
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Verified Listings</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl md:text-3xl font-bold">{businessData.verifiedListings}</div>
                  <div className="flex items-center text-kapient2-green text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />+{businessData.verifiedListingsChange} Last 30 days
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium mb-1">Listing Issues</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl md:text-3xl font-bold">{businessData.listingIssues}</div>
                  <div className="flex items-center text-kapient2-green text-xs">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    {Math.abs(businessData.listingIssuesChange)} Last 30 days
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={cn("mb-6 border", getScoreCardColor(businessData.googleAccuracyScore))}>
            <CardHeader>
              <CardTitle>Business Listing Accuracy</CardTitle>
              <CardDescription>Compare your business information with your online listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-medium">Listing Accuracy Score</h3>
                  <div className="text-5xl font-bold mt-2">{businessData.googleAccuracyScore}%</div>
                  <Badge className="mt-2 bg-amber-100 text-amber-800 border-amber-200">Critical Issues</Badge>
                </div>
                <p className="text-center text-gray-600 max-w-2xl mt-4">
                  Your business listing accuracy affects how customers find you online. Address any discrepancies to
                  improve your local SEO and customer experience.
                </p>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Listing
                  </Button>
                  <Button className="flex items-center bg-kapient-blue hover:bg-kapient-blue/90">Update Listing</Button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Business Information Comparison</h3>

                <div className="space-y-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">Business Name</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Your Information</div>
                          <div className="font-medium">{businessData.yourBusiness.name}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Online Listing</div>
                          <div
                            className={`font-medium ${businessData.yourBusiness.name === businessData.googleListing.name ? "text-kapient2-green" : "text-red-600"}`}
                          >
                            {businessData.googleListing.name}
                            <span className="ml-2 inline-flex items-center">
                              {getFieldMatchStatus(businessData.yourBusiness.name, businessData.googleListing.name)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">Address</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Your Information</div>
                          <div className="font-medium">{businessData.yourBusiness.address}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Online Listing</div>
                          <div
                            className={`font-medium ${businessData.yourBusiness.address === businessData.googleListing.address ? "text-kapient2-green" : "text-red-600"}`}
                          >
                            {businessData.googleListing.address}
                            <span className="ml-2 inline-flex items-center">
                              {getFieldMatchStatus(
                                businessData.yourBusiness.address,
                                businessData.googleListing.address,
                              )}
                            </span>
                          </div>
                          {businessData.yourBusiness.address !== businessData.googleListing.address && (
                            <Button size="sm" className="mt-2 bg-kapient-blue hover:bg-kapient-blue/90">
                              Fix it
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">City</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Your Information</div>
                          <div className="font-medium">{businessData.yourBusiness.city}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Online Listing</div>
                          <div
                            className={`font-medium ${businessData.yourBusiness.city === businessData.googleListing.city ? "text-kapient2-green" : "text-red-600"}`}
                          >
                            {businessData.googleListing.city}
                            <span className="ml-2 inline-flex items-center">
                              {getFieldMatchStatus(businessData.yourBusiness.city, businessData.googleListing.city)}
                            </span>
                          </div>
                          {businessData.yourBusiness.city !== businessData.googleListing.city && (
                            <Button size="sm" className="mt-2 bg-kapient-blue hover:bg-kapient-blue/90">
                              Fix it
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">State</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Your Information</div>
                          <div className="font-medium">{businessData.yourBusiness.state}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Online Listing</div>
                          <div
                            className={`font-medium ${businessData.yourBusiness.state === businessData.googleListing.state ? "text-kapient2-green" : "text-red-600"}`}
                          >
                            {businessData.googleListing.state}
                            <span className="ml-2 inline-flex items-center">
                              {getFieldMatchStatus(businessData.yourBusiness.state, businessData.googleListing.state)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">Phone</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Your Information</div>
                          <div className="font-medium">{businessData.yourBusiness.phone}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">Online Listing</div>
                          <div
                            className={`font-medium ${businessData.yourBusiness.phone === businessData.googleListing.phone ? "text-kapient2-green" : "text-red-600"}`}
                          >
                            {businessData.googleListing.phone}
                            <span className="ml-2 inline-flex items-center">
                              {getFieldMatchStatus(businessData.yourBusiness.phone, businessData.googleListing.phone)}
                            </span>
                          </div>
                          {businessData.yourBusiness.phone !== businessData.googleListing.phone && (
                            <Button size="sm" className="mt-2 bg-kapient-blue hover:bg-kapient-blue/90">
                              Fix it
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform-consistency">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Platform Consistency</h3>
              <p className="text-gray-500">This feature is coming soon.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="engagement-reviews">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Engagement & Reviews</h3>
              <p className="text-gray-500">This feature is coming soon.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

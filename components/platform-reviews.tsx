"use client"

import Image from "next/image"

export function PlatformReviews() {
  const reviewData = [
    {
      platform: "Google",
      logo: "/google-logo.png",
      rating: 4.7,
      count: 128,
      width: 120,
      height: 40,
    },
    {
      platform: "Yelp",
      logo: "/yelp-icon.svg",
      rating: 4.5,
      count: 42,
      width: 80,
      height: 40,
    },
    {
      platform: "Facebook",
      logo: "/facebook-icon.svg",
      rating: 4.8,
      count: 76,
      width: 100,
      height: 40,
    },
    {
      platform: "Trustpilot",
      logo: null, // This will use the fallback
      rating: 4.6,
      count: 53,
      width: 100,
      height: 40,
    },
  ]

  return (
    <div className="space-y-6">
      {reviewData.map((platform) => (
        <div key={platform.platform} className="flex items-center justify-between pb-4 border-b last:border-0">
          <div className="flex items-center">
            {platform.logo ? (
              <Image
                src={platform.logo || "/placeholder.svg"}
                alt={platform.platform}
                width={platform.width}
                height={platform.height}
                className="h-10 w-auto"
              />
            ) : (
              <div className="flex items-center">
                <Image src="/user-icon.png" alt={platform.platform} width={40} height={40} className="h-10 w-10 mr-2" />
                <span className="font-medium text-lg">{platform.platform}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{platform.rating}</div>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(platform.rating) ? "★" : i < platform.rating ? "★" : "☆"}</span>
              ))}
            </div>
            <div className="text-sm text-gray-500">{platform.count} reviews</div>
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import Image from "next/image"

export function PlatformReviews() {
  const platforms = [
    {
      name: "Google",
      logo: "/google-logo.png",
      rating: 4.7,
      reviews: 128,
    },
    {
      name: "Yelp",
      logo: "/yelp-icon.svg",
      rating: 4.5,
      reviews: 42,
    },
    {
      name: "Facebook",
      logo: "/facebook-icon.svg",
      rating: 4.8,
      reviews: 76,
    },
    {
      name: "Trustpilot",
      logo: "/trustpilot-logo.png",
      rating: 4.6,
      reviews: 53,
    },
  ]

  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <div key={platform.name} className="border-b pb-4 last:border-b-0 last:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {platform.logo ? (
                <div className="w-8 h-8 mr-3 relative">
                  <Image
                    src={platform.logo || "/placeholder.svg"}
                    alt={`${platform.name} logo`}
                    width={32}
                    height={32}
                  />
                </div>
              ) : (
                <div className="w-8 h-8 mr-3 bg-gray-200 flex items-center justify-center rounded-full">
                  <span>{platform.name.charAt(0)}</span>
                </div>
              )}
              {platform.name === "Trustpilot" && <span className="font-medium">Trustpilot</span>}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{platform.rating}</div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(platform.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500">{platform.reviews} reviews</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

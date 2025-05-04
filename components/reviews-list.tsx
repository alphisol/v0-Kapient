"use client"

import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

export function ReviewsList() {
  const reviews = [
    {
      id: 1,
      author: "John Smith",
      platform: "Google",
      platformLogo: "/google-logo.png",
      profilePicture: null,
      rating: 5,
      content: "Great service! The team was very professional and responsive to all my questions.",
      date: new Date(2023, 4, 15),
    },
    {
      id: 2,
      author: "Sarah Johnson",
      platform: "Yelp",
      platformLogo: "/yelp-icon.svg",
      profilePicture: null,
      rating: 4,
      content: "Very good experience overall. Would recommend to others looking for similar services.",
      date: new Date(2023, 4, 10),
    },
    {
      id: 3,
      author: "Michael Brown",
      platform: "Facebook",
      platformLogo: "/facebook-icon.svg",
      profilePicture: null,
      rating: 5,
      content: "Excellent customer service and very knowledgeable staff. Will definitely use again!",
      date: new Date(2023, 4, 5),
    },
    {
      id: 4,
      author: "Emily Davis",
      platform: "Trustpilot",
      platformLogo: null,
      profilePicture: null,
      rating: 3,
      content: "Service was okay but took longer than expected. Room for improvement.",
      date: new Date(2023, 4, 1),
    },
  ]

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                <Image src="/user-icon.png" alt={review.author} width={40} height={40} className="rounded-full" />
              </div>
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="flex items-center text-sm text-gray-500">
                  {review.platformLogo ? (
                    <Image
                      src={review.platformLogo || "/placeholder.svg"}
                      alt={review.platform}
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                  ) : (
                    <span className="mr-1">{review.platform}</span>
                  )}
                  <span className="mx-1">•</span>
                  <span>{formatDistanceToNow(review.date, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < review.rating ? "★" : "☆"}</span>
              ))}
            </div>
          </div>
          <div className="mt-2">{review.content}</div>
        </div>
      ))}
    </div>
  )
}

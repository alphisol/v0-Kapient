"use client"

export function ReviewsList() {
  const reviews = [
    {
      id: 1,
      name: "John Smith",
      avatar: "/avatar-john.jpg",
      rating: 5,
      date: "May 15, 2023",
      content: "Great service! The team was very professional and responsive to our needs.",
      platform: "Google",
    },
    // Add more reviews as needed
  ]

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-b-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/40x40?text=${review.name.charAt(0)}`
                  }}
                />
              </div>
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mt-3">{review.content}</div>
          <div className="mt-2 text-sm text-gray-500">Via {review.platform}</div>
        </div>
      ))}
    </div>
  )
}

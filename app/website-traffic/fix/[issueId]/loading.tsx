export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="h-16 bg-gray-100 border-b p-4">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="p-6 space-y-6">
          <div className="h-20 bg-gray-200 animate-pulse rounded"></div>

          <div className="space-y-2">
            <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-40 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="space-y-4">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="space-y-2">
              <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

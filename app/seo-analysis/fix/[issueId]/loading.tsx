import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-9 w-24 mr-4" />
        <div>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-48 mt-1" />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-md mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-6" />

          <div className="mb-4">
            <Skeleton className="h-10 w-64" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
            <Skeleton className="h-32 w-full" />
          </div>

          <div className="flex gap-3 mt-6">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

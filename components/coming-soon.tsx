import { CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ComingSoonProps {
  title: string
  description?: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <CalendarClock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl">{title} Coming Soon</CardTitle>
          <CardDescription>
            {description || "We're working hard to bring you this feature. Stay tuned for updates!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Our team is currently developing this section to provide you with valuable insights and tools.
          </p>
          <Button>Get notified when it's ready</Button>
        </CardContent>
      </Card>
    </div>
  )
}

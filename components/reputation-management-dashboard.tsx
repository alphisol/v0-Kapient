"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"

export function ReputationManagementDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("engagement-reviews")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/reputation-management/${value}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/" className="text-kapient-blue hover:underline cursor-pointer">
          Dashboard
        </Link>
        <ArrowRight className="h-3 w-3 mx-2" />
        <span>Reputation Management</span>
      </div>

      <Tabs defaultValue="engagement-reviews" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="engagement-reviews">Engagement & Reviews</TabsTrigger>
          <TabsTrigger value="business-presence">Business Presence</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement-reviews">
          <iframe src="/reputation-management/engagement-reviews" className="w-full min-h-[800px] border-none" />
        </TabsContent>

        <TabsContent value="business-presence">
          <iframe src="/reputation-management/business-presence" className="w-full min-h-[800px] border-none" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

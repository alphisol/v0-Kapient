"use client"

import { useState } from "react"
import { serverHealthDataSources, getDataSourcesForCategory, getAllCategories } from "@/lib/data-sources"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Info } from "lucide-react"

export function DataSourceViewer() {
  const [activeTab, setActiveTab] = useState("overview")
  const categories = getAllCategories()

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong className="font-medium">Developer Notice:</strong> This documentation page is intended for
              developers only and contains technical information not meant for end users.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kapient Data Tests & Crawl Schedule</h1>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <Info className="w-3 h-3 mr-1" />
          Developer Only
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex overflow-x-auto pb-2 space-x-2">
          <TabsTrigger value="overview" className="px-4 py-2 whitespace-nowrap">
            Overview
          </TabsTrigger>
          <TabsTrigger value="ssl" className="px-4 py-2 whitespace-nowrap">
            SSL/TLS
          </TabsTrigger>
          <TabsTrigger value="dns" className="px-4 py-2 whitespace-nowrap">
            DNS
          </TabsTrigger>
          <TabsTrigger value="server" className="px-4 py-2 whitespace-nowrap">
            Server
          </TabsTrigger>
          <TabsTrigger value="security" className="px-4 py-2 whitespace-nowrap">
            Security
          </TabsTrigger>
          <TabsTrigger value="seo" className="px-4 py-2 whitespace-nowrap">
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serverHealthDataSources.map((source) => (
              <DataSourceCard key={source.name} source={source} />
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getDataSourcesForCategory(category as any).map((source) => (
                <DataSourceCard key={source.name} source={source} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function DataSourceCard({ source }: { source: any }) {
  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { bg: string; text: string }> = {
      ssl: { bg: "bg-orange-100", text: "text-orange-800" },
      dns: { bg: "bg-purple-100", text: "text-purple-800" },
      server: { bg: "bg-gray-100", text: "text-gray-800" },
      security: { bg: "bg-red-100", text: "text-red-800" },
      seo: { bg: "bg-green-100", text: "text-green-800" },
    }

    const style = categories[category] || { bg: "bg-blue-100", text: "text-blue-800" }
    return (
      <span className={`${style.bg} ${style.text} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
        {category.toUpperCase()}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{source.name}</h3>
            <p className="text-sm text-gray-600">{source.description}</p>
          </div>
          {source.category && <div>{getCategoryBadge(source.category)}</div>}
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Data Source:</span>
            <span className="text-sm font-semibold">{source.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Update Frequency:</span>
            <span className="text-sm font-semibold">{source.updateFrequency}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Metrics:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {source.metrics.map((metric: string) => (
              <li key={metric} className="text-sm">
                {metric}
              </li>
            ))}
          </ul>
        </div>

        {source.apiEndpoint && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">API Endpoint:</h4>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded block overflow-x-auto">{source.apiEndpoint}</code>
          </div>
        )}
      </div>
    </div>
  )
}

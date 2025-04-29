"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { serverHealthDataSources, getMetricsForCategory } from "@/lib/data-sources"

export function DataSourceViewer() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Server Health Data Sources</h1>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ssl">SSL/TLS</TabsTrigger>
          <TabsTrigger value="dns">DNS</TabsTrigger>
          <TabsTrigger value="server">Server</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serverHealthDataSources.map((source) => (
              <Card key={source.name}>
                <CardHeader>
                  <CardTitle>{source.name}</CardTitle>
                  <CardDescription>{source.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Update Frequency:</span>
                      <span>{source.updateFrequency}</span>
                    </div>
                    <div>
                      <span className="font-medium">Metrics:</span>
                      <ul className="list-disc pl-5 mt-2">
                        {source.metrics.map((metric) => (
                          <li key={metric} className="text-sm">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {source.apiEndpoint && (
                      <div className="flex justify-between">
                        <span className="font-medium">API Endpoint:</span>
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{source.apiEndpoint}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ssl">
          <MetricCategoryView category="ssl" />
        </TabsContent>

        <TabsContent value="dns">
          <MetricCategoryView category="dns" />
        </TabsContent>

        <TabsContent value="server">
          <MetricCategoryView category="server" />
        </TabsContent>

        <TabsContent value="security">
          <MetricCategoryView category="security" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCategoryView({ category }: { category: "ssl" | "dns" | "server" | "security" }) {
  const metrics = getMetricsForCategory(category)

  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <Card key={metric.metricName}>
          <CardHeader>
            <CardTitle>{metric.metricName}</CardTitle>
            <CardDescription>
              Provided by {metric.dataSource} via {metric.apiMethod}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Response Format:</h4>
                <p className="text-sm text-gray-600">{metric.responseFormat}</p>
              </div>

              {metric.sampleResponse && (
                <div>
                  <h4 className="font-medium mb-1">Sample Response:</h4>
                  <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto">{metric.sampleResponse}</pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

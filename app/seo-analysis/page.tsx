import type { Metadata } from "next"
import { SEOAnalysisDashboard } from "@/components/seo-analysis-dashboard"

export const metadata: Metadata = {
  title: "SEO Analysis | Kapient Dashboard",
  description: "Comprehensive SEO analysis for your website",
}

export default function SEOAnalysisPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SEO Analysis</h1>
      <SEOAnalysisDashboard />
    </div>
  )
}

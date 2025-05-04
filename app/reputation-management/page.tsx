import { ReputationManagementDashboard } from "@/components/reputation-management-dashboard"

export const metadata = {
  title: "Reputation Management | Kapient SEO Dashboard",
  description: "Monitor and manage your online reputation across platforms",
}

export default function ReputationManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reputation Management</h1>
      <ReputationManagementDashboard />
    </div>
  )
}

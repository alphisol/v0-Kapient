import { EmailDeliverabilityDashboard } from "@/components/email-deliverability-dashboard"

export const metadata = {
  title: "Email Deliverability and Reputation | Kapient SEO Dashboard",
  description: "Monitor and improve your email deliverability and sender reputation",
}

export default function EmailDeliverabilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Email Deliverability and Reputation</h1>
      <EmailDeliverabilityDashboard />
    </div>
  )
}

import { SettingsLayout } from "@/components/settings/settings-layout"
import { HistoricalSettings } from "@/components/settings/historical-settings"

export const metadata = {
  title: "Historical Settings | Kapient SEO Dashboard",
  description: "View historical data and reports",
}

export default function HistoricalSettingsPage() {
  return (
    <SettingsLayout>
      <HistoricalSettings />
    </SettingsLayout>
  )
}

import { SettingsLayout } from "@/components/settings/settings-layout"
import { SecuritySettings } from "@/components/settings/security-settings"

export const metadata = {
  title: "Security Settings | Kapient SEO Dashboard",
  description: "Manage your security settings and password",
}

export default function SecuritySettingsPage() {
  return (
    <SettingsLayout>
      <SecuritySettings />
    </SettingsLayout>
  )
}

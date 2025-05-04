import { SettingsLayout } from "@/components/settings/settings-layout"
import { GeneralInfoSettings } from "@/components/settings/general-info-settings"

export const metadata = {
  title: "Account Settings | Kapient SEO Dashboard",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return (
    <SettingsLayout>
      <GeneralInfoSettings />
    </SettingsLayout>
  )
}

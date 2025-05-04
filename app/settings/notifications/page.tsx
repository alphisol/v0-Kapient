import { SettingsLayout } from "@/components/settings/settings-layout"
import { NotificationSettings } from "@/components/settings/notification-settings"

export const metadata = {
  title: "Notification Settings | Kapient SEO Dashboard",
  description: "Manage your notification preferences",
}

export default function NotificationSettingsPage() {
  return (
    <SettingsLayout>
      <NotificationSettings />
    </SettingsLayout>
  )
}

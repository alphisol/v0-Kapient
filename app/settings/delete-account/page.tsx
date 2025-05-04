import { SettingsLayout } from "@/components/settings/settings-layout"
import { DeleteAccount } from "@/components/settings/delete-account"

export const metadata = {
  title: "Delete Account | Kapient SEO Dashboard",
  description: "Delete your account and all associated data",
}

export default function DeleteAccountPage() {
  return (
    <SettingsLayout>
      <DeleteAccount />
    </SettingsLayout>
  )
}

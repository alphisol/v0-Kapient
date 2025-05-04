"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    desktopNotifications: false,
    smsAlerts: false,
    emailNotifications: true,
    announcements: true,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-medium text-base">Enable Desktop Notification</h3>
                <p className="text-sm text-gray-500 mt-1">Receive notifications all the time on your desktop.</p>
              </div>
              <Switch
                checked={settings.desktopNotifications}
                onCheckedChange={() => handleToggle("desktopNotifications")}
                className="ml-auto sm:ml-0"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-medium text-base">SMS Alerts</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Receive mobile alerts for server downtime or user activity.
                </p>
              </div>
              <Switch
                checked={settings.smsAlerts}
                onCheckedChange={() => handleToggle("smsAlerts")}
                className="ml-auto sm:ml-0"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-medium text-base">Communication Email</h3>
                <p className="text-sm text-gray-500 mt-1">Instant notifications on your device in real-time.</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
                className="ml-auto sm:ml-0"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-medium text-base">Announcements & Updates</h3>
                <p className="text-sm text-gray-500 mt-1">Receive emails about server announcements and updates.</p>
              </div>
              <Switch
                checked={settings.announcements}
                onCheckedChange={() => handleToggle("announcements")}
                className="ml-auto sm:ml-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

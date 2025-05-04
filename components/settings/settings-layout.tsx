"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, User, Shield, Bell, History, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("general-info")

  const settingsTabs = [
    {
      id: "general-info",
      label: "General Info",
      icon: User,
      href: "/settings",
    },
    {
      id: "security",
      label: "Security Settings",
      icon: Shield,
      href: "/settings/security",
    },
    {
      id: "notifications",
      label: "Notifications Settings",
      icon: Bell,
      href: "/settings/notifications",
    },
    {
      id: "historical",
      label: "Historical Settings",
      icon: History,
      href: "/settings/historical",
    },
  ]

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 pt-16 md:pt-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-kapient-darkgray">Account Settings</h1>
        <div className="flex items-center text-sm text-kapient-gray mt-1">
          <Link href="/" className="text-kapient-blue hover:underline">
            Dashboard
          </Link>
          <ArrowRight className="h-3 w-3 mx-2" />
          <span>{pathname.split("/").pop()?.replace("-", " ") || "General Info"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-20">
            <div className="p-6 flex flex-col items-center border-b">
              <div className="w-24 h-24 rounded-full bg-kapient-blue flex items-center justify-center text-white text-2xl font-semibold mb-3">
                U
              </div>
              <div className="text-lg font-medium">Testing</div>
              <div className="text-sm text-kapient-gray">testingkapient@yopmail.com</div>
            </div>

            <div className="p-4 bg-gray-50">
              <h3 className="font-medium text-lg mb-2">Settings</h3>
            </div>

            <nav className="p-2">
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2 lg:gap-0">
                {settingsTabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={cn(
                      "flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal",
                      pathname === tab.href
                        ? "bg-kapient-lightblue text-kapient-blue"
                        : "text-kapient-slate hover:bg-kapient-lightgray",
                    )}
                  >
                    <tab.icon
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3",
                        pathname === tab.href ? "text-kapient-blue" : "text-kapient-gray",
                      )}
                    />
                    {tab.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/settings/delete-account"
                className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 mt-2"
              >
                <Trash2 className="h-5 w-5 mr-3" />
                Delete
              </Link>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

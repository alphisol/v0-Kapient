"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => document.documentElement.classList.toggle("sidebar-open")}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-kapient-blue">Kapient</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 bg-kapient-blue text-white hover:bg-kapient-blue/90"
          >
            <span>Upgrade</span>
          </Button>

          <button className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </button>

          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <div className="h-8 w-8 rounded-full bg-kapient-blue flex items-center justify-center text-white overflow-hidden">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = ""
                    e.currentTarget.parentElement.innerHTML = "U"
                  }}
                />
              </div>
              <span className="hidden md:inline-block font-medium">Testing</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Account Settings
                </Link>
                <Link
                  href="/settings/security"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Security
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

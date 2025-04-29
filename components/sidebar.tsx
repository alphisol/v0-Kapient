"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Globe,
  Home,
  Menu,
  MessageSquare,
  Phone,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Star,
  X,
  FileCode,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Update the menuItems array to include the new technical SEO page and remove Technical Issues
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Globe, label: "Website Status", href: "/website-status" },
    { icon: BarChart3, label: "Website Traffic", href: "/website-traffic" },
    { icon: Server, label: "Server Health", href: "/server-health" },
    { icon: FileCode, label: "Technical SEO", href: "/technical-seo" },
    { icon: MessageSquare, label: "Form Performance", href: "/form-performance" },
    { icon: Phone, label: "Communications", href: "/communications" },
    { icon: Star, label: "Business Presence", href: "/business-presence" },
    { icon: Search, label: "SEO Factors", href: "/seo-factors" },
    { icon: ShieldCheck, label: "Security", href: "/security" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  // Handle mobile sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <div className="md:hidden fixed top-0 left-0 z-40 p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-sm"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-30",
          collapsed ? "w-16" : "w-64",
          "fixed h-full md:sticky top-0 left-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && <div className="font-bold text-xl text-kapient-blue">Kapient</div>}
          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="font-bold text-xl text-kapient-blue">K</div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto hidden md:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto md:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-kapient-lightblue text-kapient-blue"
                      : "text-kapient-slate hover:bg-kapient-lightgray",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-kapient-blue" : "text-kapient-gray")}
                  />
                  {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          {!collapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-kapient-blue flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">User</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-kapient-blue flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Menu,
  Mail,
  Server,
  Settings,
  FileCode,
  X,
  Star,
  Building,
  Shield,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type MenuItem = {
  icon: any
  label: string
  href: string
  subItems?: MenuItem[]
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "/reputation-management": true, // Default expanded
  })

  // Updated menuItems array with nested structure
  const menuItems: MenuItem[] = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Server, label: "Server Health", href: "/server-health" },
    { icon: FileCode, label: "Technical SEO", href: "/technical-seo" },
    { icon: Mail, label: "Email Deliverability", href: "/email-deliverability" },
    {
      icon: Star,
      label: "Reputation Management",
      href: "/reputation-management",
      subItems: [
        { icon: null, label: "Engagement & Reviews", href: "/reputation-management/engagement-reviews" },
        { icon: Building, label: "Business Presence", href: "/reputation-management/business-presence" },
      ],
    },
    { icon: Shield, label: "Security & Compliance", href: "/security-compliance" },
    { icon: FileCode, label: "Documentation", href: "/documentation/data-sources" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  // Handle mobile sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toggle submenu
  const toggleSubmenu = (href: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  // Check if a menu item or any of its subitems is active
  const isMenuItemActive = (item: MenuItem): boolean => {
    if (pathname === item.href) return true
    if (item.subItems && pathname.startsWith(item.href)) return true
    return false
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)

    // Add event listener for custom sidebar toggle
    const handleSidebarToggle = () => {
      setIsMobileMenuOpen((prev) => !prev)
    }

    document.addEventListener("sidebarToggle", handleSidebarToggle)

    return () => {
      document.removeEventListener("sidebarToggle", handleSidebarToggle)
    }
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

  // Render menu item
  const renderMenuItem = (item: MenuItem) => {
    const isActive = isMenuItemActive(item)
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedItems[item.href]

    return (
      <div key={item.href} className="flex flex-col">
        {hasSubItems ? (
          <button
            onClick={() => toggleSubmenu(item.href)}
            className={cn(
              "flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium transition-colors",
              isActive ? "bg-kapient-lightblue text-kapient-blue" : "text-kapient-slate hover:bg-kapient-lightgray",
            )}
          >
            <div className="flex items-center">
              <item.icon
                className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-kapient-blue" : "text-kapient-gray")}
              />
              {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
            </div>
            {!collapsed &&
              hasSubItems &&
              (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors",
              isActive ? "bg-kapient-lightblue text-kapient-blue" : "text-kapient-slate hover:bg-kapient-lightgray",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon && (
              <item.icon
                className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-kapient-blue" : "text-kapient-gray")}
              />
            )}
            {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
          </Link>
        )}

        {/* Render sub-items if expanded */}
        {!collapsed && hasSubItems && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.subItems!.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === subItem.href
                    ? "bg-kapient-lightblue text-kapient-blue"
                    : "text-kapient-slate hover:bg-kapient-lightgray",
                )}
              >
                {subItem.icon && (
                  <subItem.icon
                    className={cn(
                      "h-4 w-4 flex-shrink-0 mr-2",
                      pathname === subItem.href ? "text-kapient-blue" : "text-kapient-gray",
                    )}
                  />
                )}
                <span className="truncate">{subItem.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

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
          "fixed h-[calc(100vh-4rem)] md:sticky top-16 left-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "sidebar-container",
        )}
      >
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-2">{menuItems.map(renderMenuItem)}</nav>
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

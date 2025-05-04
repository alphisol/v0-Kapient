import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import "@/app/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50 flex-col">
          <Navbar />
          <div className="flex flex-1 flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1 overflow-auto w-full p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };

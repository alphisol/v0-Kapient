"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    // Handle password change
    console.log("Password change submitted")
    // Show success message or handle errors
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-sm sm:text-base">
            Old Password
          </Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            className="h-10 sm:h-auto text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm sm:text-base">
            New Password
          </Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            className="h-10 sm:h-auto text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm sm:text-base">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your new password"
            className="h-10 sm:h-auto text-base"
          />
        </div>

        <div className="pt-6">
          <Button type="submit" className="w-full bg-kapient-blue hover:bg-kapient-blue/90 h-11 text-base">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

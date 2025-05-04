"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"

export function GeneralInfoSettings() {
  const [formData, setFormData] = useState({
    firstName: "Testing",
    lastName: "",
    email: "testingkapient@yopmail.com",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Show success message or handle errors
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">General Info</h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm sm:text-base">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="h-10 sm:h-auto text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm sm:text-base">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="h-10 sm:h-auto text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm sm:text-base">
            Phone Number
          </Label>
          <div className="flex">
            <div className="flex items-center border rounded-l-md px-3 bg-gray-50 text-gray-500 min-w-[40px] justify-center">
              <span>+1</span>
            </div>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-l-none h-10 sm:h-auto text-base"
              placeholder="Enter your phone number"
              type="tel"
              inputMode="tel"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          <div className="w-16 h-16 rounded-full bg-kapient-blue flex items-center justify-center text-white text-xl font-semibold">
            U
          </div>
          <Button variant="outline" className="flex items-center justify-center w-full sm:w-auto">
            <Pencil className="h-4 w-4 mr-2" />
            Change Profile
          </Button>
        </div>

        <div className="pt-6">
          <Button type="submit" className="w-full sm:w-auto bg-kapient-blue hover:bg-kapient-blue/90 h-11 text-base">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

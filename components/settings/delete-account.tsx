"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

export function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  const isDeleteEnabled = confirmText === "DELETE" && isChecked

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-semibold text-red-500">Delete Account</h2>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
        <p className="text-red-800 text-sm">
          Warning: This action is irreversible. Deleting your account will permanently remove all your data, settings,
          and history from our system. This cannot be undone.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-red-600 text-sm sm:text-base">
            To confirm deletion, type "DELETE" in the field below
          </Label>
          <Input
            id="confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="border-red-300 focus:border-red-500 focus:ring-red-500 h-10 sm:h-auto text-base"
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="confirmCheck"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="h-4 w-4 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <Label htmlFor="confirmCheck" className="text-sm text-gray-700">
            I understand that this action cannot be undone and all my data will be permanently deleted.
          </Label>
        </div>

        <Button
          type="button"
          disabled={!isDeleteEnabled}
          className="bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300 w-full sm:w-auto h-11 text-base"
        >
          Permanently Delete Account
        </Button>
      </div>
    </div>
  )
}

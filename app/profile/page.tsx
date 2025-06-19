"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [hideBalance, setHideBalance] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <main className="flex-1 p-6 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Profile</h1>
          <p className="text-slate-400">Manage your account</p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-6 text-center">
          <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-medium">G</span>
          </div>
          <h2 className="text-2xl font-medium mb-2">Google User</h2>
          <p className="text-slate-400">user@gmail.com</p>
        </div>

        {/* Settings */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between py-4">
            <span className="text-lg">Hide Balance</span>
            <Switch checked={hideBalance} onCheckedChange={setHideBalance} className="data-[state=checked]:bg-white" />
          </div>
          <div className="border-t border-slate-700 my-2"></div>
          <div className="flex items-center justify-between py-4">
            <span className="text-lg">Two-Factor Auth</span>
            <Switch
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
              className="data-[state=checked]:bg-white"
            />
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          variant="destructive"
          className="w-full bg-red-900/50 hover:bg-red-900/70 text-red-400 border border-red-800 py-4 rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </main>

      <BottomNavigation />
    </div>
  )
}

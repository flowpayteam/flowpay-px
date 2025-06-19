"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Eye, Crown, ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <main className="flex-1 p-6 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Good morning</h1>
          <p className="text-slate-400">{"Here's your overview"}</p>
        </div>

        {/* Balance Card */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Total Balance</span>
            <Eye className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-4xl font-light">$2847.33</div>
        </div>

        {/* FlowPoints Card */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-slate-400 mb-1">FlowPoints</div>
              <div className="text-3xl font-light">2,847</div>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-medium">Gold</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Progress to Platinum</span>
              <span className="text-slate-400">1,153 points to go</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>

          <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white border-0">
            Redeem Rewards
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Interest earned</span>
              </div>
              <span className="text-green-400 font-medium">+8</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>Referred Mike</span>
              </div>
              <span className="text-green-400 font-medium">+100</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

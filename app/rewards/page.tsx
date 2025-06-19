"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Gift, Crown, Gamepad2, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RewardsPage() {
  const currentFlowPoints = 11
  const flowPointsToNextLevel = 25
  const currentLevel = 1
  const progress = (currentFlowPoints / flowPointsToNextLevel) * 100

  const featuredRewards = [
    {
      id: 1,
      title: "TODAY'S PRIZE",
      subtitle: "MINIGAME",
      reward: "5 FlowPoints",
      icon: Gamepad2,
      bgColor: "bg-amber-600",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Order Online",
      subtitle: "Get 2x points",
      reward: "Double rewards",
      icon: ShoppingBag,
      bgColor: "bg-blue-600",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <main className="flex-1 p-6 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2">FlowPay Rewards</h1>
          <p className="text-slate-400">Earn points with every transaction</p>
        </div>

        {/* Rewards Box */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-48 h-48 mb-6">
            {/* 3D Box Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl transform rotate-3 shadow-2xl"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Gift className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <div className="text-sm text-slate-300">FlowPay</div>
              </div>
            </div>
            {/* Lock indicator */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
            </div>
          </div>

          {/* Box Status */}
          <div className="mb-6">
            <p className="text-slate-400 text-sm mb-1">YOUR BOX</p>
            <h2 className="text-2xl font-light">Ready to Open</h2>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400">
              {currentFlowPoints} / {flowPointsToNextLevel} FLOWPOINTS TO
            </span>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-medium">LEVEL {currentLevel + 1}</span>
            </div>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-medium">
            Open Box
          </Button>
        </div>

        {/* Current Level Status */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h3 className="font-medium">Gold Member</h3>
                <p className="text-slate-400 text-sm">Level {currentLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light">{currentFlowPoints}</p>
              <p className="text-slate-400 text-sm">FlowPoints</p>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">Featured</h3>
          <div className="grid grid-cols-1 gap-4">
            {featuredRewards.map((reward) => {
              const IconComponent = reward.icon
              return (
                <div key={reward.id} className="relative overflow-hidden rounded-2xl bg-slate-800 h-32">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-transparent z-10"></div>
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-20 p-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">{reward.subtitle}</span>
                      </div>
                      <h4 className="text-lg font-medium">{reward.title}</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-medium">{reward.reward}</span>
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                        Claim
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 p-4 h-auto">
            <div className="text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-sm">Daily Check-in</div>
              <div className="text-xs text-slate-400">+5 FlowPoints</div>
            </div>
          </Button>
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 p-4 h-auto">
            <div className="text-center">
              <Gift className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-sm">Refer Friend</div>
              <div className="text-xs text-slate-400">+50 FlowPoints</div>
            </div>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

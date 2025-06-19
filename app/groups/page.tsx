"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Plus, ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GroupsPage() {
  const groups = [
    {
      id: 1,
      name: "Pizza Night Tonight",
      members: 6,
      code: "PIZZA24",
      current: 45,
      target: 60,
      timeLeft: "2h left",
      emoji: "🍕",
      progress: 75,
      memberAvatars: [
        { initial: "A", color: "bg-blue-500" },
        { initial: "J", color: "bg-purple-500" },
        { initial: "M", color: "bg-pink-500" },
        { initial: "S", color: "bg-gray-500" },
        { initial: "K", color: "bg-gray-600" },
        { initial: "+1", color: "bg-gray-700" },
      ],
    },
    {
      id: 2,
      name: "Concert Savings Goal",
      members: 4,
      code: "MUSIC25",
      current: 180,
      target: 300,
      timeLeft: "12 days left",
      emoji: "🎵",
      progress: 60,
      memberAvatars: [
        { initial: "Y", color: "bg-green-500" },
        { initial: "E", color: "bg-yellow-500" },
        { initial: "C", color: "bg-gray-500" },
        { initial: "D", color: "bg-blue-500" },
      ],
    },
    {
      id: 3,
      name: "Weekend Getaway",
      members: 8,
      code: "BEACH25",
      current: 675,
      target: 1500,
      timeLeft: "3 weeks left",
      emoji: "🏖️",
      progress: 45,
      memberAvatars: [
        { initial: "Y", color: "bg-cyan-500" },
        { initial: "M", color: "bg-blue-500" },
        { initial: "L", color: "bg-purple-500" },
        { initial: "+5", color: "bg-gray-600" },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <main className="flex-1 p-6 pb-32 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium">Active Groups</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full"></div>
            <div className="relative">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
            </div>
          </div>
        </div>

        {/* Groups List */}
        <div className="flex flex-col gap-4 mb-6">
          {groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`} className="block">
              <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-750 transition-colors cursor-pointer border border-slate-700">
                {/* Group Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-xl">{group.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">{group.name}</h3>
                    <p className="text-slate-400 text-sm">
                      {group.members} members • Code: {group.code}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
                    <div
                      className="bg-slate-400 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${group.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-medium">
                      ${group.current} of ${group.target} collected
                    </span>
                    <span className="text-orange-400 text-sm">{group.timeLeft}</span>
                  </div>
                </div>

                {/* Member Avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {group.memberAvatars.map((avatar, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 ${avatar.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}
                      >
                        {avatar.initial}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <span>View details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Join Group Button */}
        <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white border-0 py-4 rounded-2xl">
          <Users className="w-5 h-5 mr-2" />
          Join a Group
        </Button>
      </main>

      <BottomNavigation />
    </div>
  )
}

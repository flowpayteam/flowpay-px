"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Plus, ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

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

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    target: "",
    description: "",
    emoji: "🎯",
    timeLimit: "",
  })

  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [joinGroupCode, setJoinGroupCode] = useState("")

  const handleCreateGroup = () => {
    // Here you would typically send the data to your backend
    console.log("Creating group:", newGroup)
    // Reset form and close dialog
    setNewGroup({
      name: "",
      target: "",
      description: "",
      emoji: "🎯",
      timeLimit: "",
    })
    setIsDialogOpen(false)
  }

  const handleJoinGroup = () => {
    // Here you would typically send the code to your backend to join the group
    console.log("Joining group with code:", joinGroupCode)
    // Reset form and close dialog
    setJoinGroupCode("")
    setIsJoinDialogOpen(false)
  }

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
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
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
        <Button
          onClick={() => setIsJoinDialogOpen(true)}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white border-0 py-4 rounded-2xl"
        >
          <Users className="w-5 h-5 mr-2" />
          Join a Group
        </Button>

        {/* Create Group Modal */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Group</h2>
                <button onClick={() => setIsDialogOpen(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Group Name</label>
                  <input
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    placeholder="Enter group name"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target Amount ($)</label>
                  <input
                    type="number"
                    value={newGroup.target}
                    onChange={(e) => setNewGroup({ ...newGroup, target: e.target.value })}
                    placeholder="Enter target amount"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Emoji</label>
                  <div className="flex gap-2">
                    {["🎯", "🍕", "🎵", "🏖️", "🎉", "💰", "🚗", "🏠"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setNewGroup({ ...newGroup, emoji })}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                          newGroup.emoji === emoji ? "bg-purple-600" : "bg-slate-700 hover:bg-slate-600"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    placeholder="What's this group for?"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Time Limit</label>
                  <input
                    value={newGroup.timeLimit}
                    onChange={(e) => setNewGroup({ ...newGroup, timeLimit: e.target.value })}
                    placeholder="e.g., 2 weeks, 1 month"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <button
                  onClick={handleCreateGroup}
                  disabled={!newGroup.name || !newGroup.target}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Join Group Modal */}
        {isJoinDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Join a Group</h2>
                <button onClick={() => setIsJoinDialogOpen(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Group Code</label>
                  <input
                    value={joinGroupCode}
                    onChange={(e) => setJoinGroupCode(e.target.value.toUpperCase())}
                    placeholder="Enter group code (e.g., PIZZA24)"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-center text-lg font-mono tracking-wider"
                    maxLength={8}
                  />
                </div>

                <div className="text-sm text-slate-400 text-center">
                  Ask your friends for the group code to join their savings goal
                </div>

                <button
                  onClick={handleJoinGroup}
                  disabled={!joinGroupCode || joinGroupCode.length < 4}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium"
                >
                  Join Group
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

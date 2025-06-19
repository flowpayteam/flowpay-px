"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Send, DollarSign, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GroupDetailPage() {
  const router = useRouter()
  const params = useParams()
  const groupId = params.id as string
  const [message, setMessage] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock group data - in real app this would come from API
  const group = {
    id: Number.parseInt(groupId),
    name: groupId === "1" ? "Pizza Night Tonight" : groupId === "2" ? "Concert Savings Goal" : "Board Game Night",
    members: groupId === "1" ? 6 : groupId === "2" ? 4 : 5,
    code: groupId === "1" ? "PIZZA24" : groupId === "2" ? "MUSIC25" : "GAMES42",
    current: groupId === "1" ? 45 : groupId === "2" ? 180 : 32,
    target: groupId === "1" ? 60 : groupId === "2" ? 300 : 80,
    timeLeft: groupId === "1" ? "2h left" : groupId === "2" ? "12 days left" : "This Friday",
    emoji: groupId === "1" ? "🍕" : groupId === "2" ? "🎵" : "🎲",
    progress: groupId === "1" ? 75 : groupId === "2" ? 60 : 40,
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah Chen",
      message: "Hey everyone! Ready for pizza night?",
      time: "2:30 PM",
      isPayment: false,
      isCurrentUser: false,
    },
    {
      id: 2,
      user: "You",
      message: "Just contributed $15",
      time: "2:32 PM",
      isPayment: true,
      amount: 15,
      isCurrentUser: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      message: "Count me in! Adding $10 now",
      time: "2:35 PM",
      isPayment: false,
      isCurrentUser: false,
    },
    {
      id: 4,
      user: "Mike Johnson",
      message: "",
      time: "2:35 PM",
      isPayment: true,
      amount: 10,
      isCurrentUser: false,
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isPayment: false,
        isCurrentUser: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleSendPayment = () => {
    if (paymentAmount && Number.parseFloat(paymentAmount) > 0) {
      const paymentMessage = {
        id: messages.length + 1,
        user: "You",
        message: "",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isPayment: true,
        amount: Number.parseFloat(paymentAmount),
        isCurrentUser: true,
      }
      setMessages([...messages, paymentMessage])
      setPaymentAmount("")
      setShowPayment(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 p-4 flex items-center gap-4 border-b border-slate-700">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1">
          <div className="text-2xl">{group.emoji}</div>
          <div>
            <h1 className="font-medium">{group.name}</h1>
            <p className="text-sm text-slate-400">{group.members} members</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Group Progress */}
      <div className="bg-slate-800 p-4 border-b border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Group Goal Progress</span>
          <span className="text-sm text-orange-400">{group.timeLeft}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${group.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">
            ${group.current} of ${group.target}
          </span>
          <Button size="sm" onClick={() => setShowPayment(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <DollarSign className="w-4 h-4 mr-1" />
            Contribute
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs ${msg.isCurrentUser ? "order-2" : "order-1"}`}>
                {!msg.isCurrentUser && <p className="text-xs text-slate-400 mb-1 px-3">{msg.user}</p>}
                <div
                  className={`rounded-2xl p-3 ${
                    msg.isCurrentUser ? "bg-blue-600 text-white" : "bg-slate-700 text-white"
                  }`}
                >
                  {msg.isPayment ? (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="font-medium text-green-400">Contributed ${msg.amount}</span>
                    </div>
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 px-3">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium mb-4">Contribute to {group.name}</h3>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white text-lg text-center"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPayment(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button onClick={handleSendPayment} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                Send ${paymentAmount || "0"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-4 bg-slate-900">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border-slate-700 text-white"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}

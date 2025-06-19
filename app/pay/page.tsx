"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Eye, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PayPage() {
  const [amount, setAmount] = useState("10")
  const [recipient, setRecipient] = useState("10")
  const [activeTab, setActiveTab] = useState<"pay" | "request">("pay")

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <main className="flex-1 p-6 pb-24">
        {/* Balance */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl font-light">$2847.33</span>
            <Eye className="w-6 h-6 text-slate-400" />
          </div>

          {/* Pay/Request Toggle */}
          <div className="flex bg-slate-800 rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab("pay")}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                activeTab === "pay" ? "bg-slate-700 text-white" : "text-slate-400"
              }`}
            >
              Pay
            </button>
            <button
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                activeTab === "request" ? "bg-slate-700 text-white" : "text-slate-400"
              }`}
            >
              Request
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-6">
          <div className="text-center">
            <div className="text-6xl font-light mb-6">${amount}</div>
            <div className="space-y-4">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-transparent text-center text-2xl border-b border-slate-600 pb-2 focus:outline-none focus:border-slate-400"
                placeholder="Enter recipient"
              />
              <div className="text-right">
                <button className="text-slate-400 text-sm">max</button>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Button */}
        <Button variant="outline" className="w-full mb-6 bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
          <QrCode className="w-5 h-5 mr-3" />
          Show QR Code to Receive
        </Button>

        {/* Pay Button */}
        <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 text-lg py-4 rounded-xl font-medium">
          {activeTab === "pay" ? `Pay $${amount}` : `Request $${amount}`}
        </Button>
      </main>

      <BottomNavigation />
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Users, Gift, User } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/pay", icon: CreditCard, label: "Pay" },
    { href: "/groups", icon: Users, label: "Groups" },
    { href: "/rewards", icon: Gift, label: "Rewards" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-slate-800/90 backdrop-blur-sm border-t border-slate-700">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

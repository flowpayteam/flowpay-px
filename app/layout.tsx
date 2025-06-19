import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PrivyProvider } from '@privy-io/react-auth'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlowPay - P2P Payments",
  description: "Send and receive money with friends",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-900 text-white min-h-screen`}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ['email', 'wallet', 'sms', 'google', 'apple'],
            embeddedWallets: { createOnLogin: 'all-users' },
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
              logo: 'https://your-domain.com/logo.png',
            },
            legal: {
              termsAndConditionsUrl: 'https://flowpay.com/terms',
              privacyPolicyUrl: 'https://flowpay.com/privacy',
            },
          }}
        >
          <div className="max-w-sm mx-auto min-h-screen bg-slate-900">{children}</div>
        </PrivyProvider>
      </body>
    </html>
  )
}

import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import { reactQueryClient } from "@/client/reactQueryClient"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"

import { config } from "@/lib/wagmiConfig"
import ClientSessionProvider from "@/components/client-session-provider"
import { Loading } from "@/components/loading"
import { ThemeClientProvider } from "@/components/theme-client-provider"
import { Toast } from "@/components/toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 antialiased dark:bg-slate-950">
        <ClientSessionProvider refetchOnWindowFocus={false}>
          <QueryClientProvider client={reactQueryClient}>
            <WagmiProvider config={config}>
              <RainbowKitProvider
                modalSize="compact"
                showRecentTransactions={true}
              >
                <ThemeClientProvider>
                  <Loading />
                  {children}
                  <div className="fixed" />
                  <Toast />
                </ThemeClientProvider>
              </RainbowKitProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </ClientSessionProvider>
        <div id="modal-portal-container" />
      </body>
    </html>
  )
}

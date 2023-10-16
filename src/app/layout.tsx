import "./globals.css"

import { reactQueryClient } from "@/client/reactQueryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { WagmiConfig } from "wagmi"

import { wagmiConfig } from "@/lib/wagmiConfig"
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
            <WagmiConfig config={wagmiConfig}>
              <ThemeClientProvider>
                <Loading />
                {children}
                <div className="fixed" />
                <Toast />
              </ThemeClientProvider>
            </WagmiConfig>
          </QueryClientProvider>
        </ClientSessionProvider>
        <div id="modal-portal-container" />
      </body>
    </html>
  )
}

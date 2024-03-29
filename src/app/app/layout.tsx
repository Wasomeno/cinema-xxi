import { ReactNode } from "react"

import { AppNavigation } from "@/components/Navigations/App/app-navigation"
import { AppNavigationMobile } from "@/components/Navigations/App/app-navigation-mobile"

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white dark:bg-slate-950">
      <AppNavigation />
      <div className="relative flex flex-1 flex-col">{children}</div>
      <AppNavigationMobile />
    </div>
  )
}

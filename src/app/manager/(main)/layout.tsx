import { ReactNode } from "react"
import { Metadata } from "next"

import { ManagerToolbar } from "@/components/Navigations/manager-toolbar"
import { ManagerNavigation } from "@/components/Navigations/Manager/ManagerNavigation"
import { ManagerNavigationMobile } from "@/components/Navigations/Manager/ManagerNavigationMobile"

export const metadata: Metadata = {
  title: { template: "%s | Manager", default: "Dashboard | Manager" },
}

export default function ManagerMainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <ManagerToolbar />
      <div className="flex flex-1 justify-center gap-4 p-4">
        <ManagerNavigation />
        <div className="flex w-full overflow-y-scroll rounded-lg border bg-white dark:border-slate-700 dark:bg-slate-900">
          {children}
        </div>
      </div>
      <ManagerNavigationMobile />
    </div>
  )
}

import { ReactNode } from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { AdminToolbar } from "@/components/Navigations/Admin/admin-toolbar"
import { AdminNavigation } from "@/components/Navigations/Admin/AdminNavigation/admin-navigation"
import { AdminNavigationMobile } from "@/components/Navigations/Admin/AdminNavigationMobile/admin-mobile-navigation"

export async function generateMetadata() {
  const session = await getServerSession(authOptions)
  return {
    title: {
      template: `%s | ${session?.user.cinema?.name}`,
    },
  }
}

export default function AdminMainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <AdminToolbar />
      <div className="flex flex-1 justify-center gap-4 p-4">
        <AdminNavigation />
        <div className="flex w-full flex-1 overflow-y-scroll rounded-lg border bg-white dark:border-slate-700 dark:bg-slate-900">
          {children}
        </div>
      </div>
      <AdminNavigationMobile />
    </div>
  )
}

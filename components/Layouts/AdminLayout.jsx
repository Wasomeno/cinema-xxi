import Head from "next/head"
import { useRouter } from "next/router"
import { useViewport } from "hooks/useViewport"
import { useSession } from "next-auth/react"

import AnimatedContainer from "../AnimatedContainer"
import { AdminNavigation } from "../Navigations/Admin/AdminNavigation"
import { AdminNavigationMobile } from "../Navigations/Admin/AdminNavigationMobile"
import { AdminToolbar } from "../Navigations/Admin/AdminToolbar"
import { Spinner } from "../Spinner"

export const AdminLayout = ({ children, pageTitle }) => {
  const { data: sessionData, status } = useSession()
  const viewport = useViewport()

  if (status === "loading")
    return (
      <AnimatedContainer className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </AnimatedContainer>
    )

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-slate-50 dark:bg-slate-950">
      <Head>
        <title>
          {sessionData?.user.cinemaName} | {pageTitle}
        </title>
        <meta property="description" content="Admin page" />
      </Head>
      <AdminToolbar />
      <div className="flex flex-1 justify-center gap-4 p-4">
        <AdminNavigation />
        <div className="flex w-full flex-1 overflow-y-scroll rounded-lg border bg-white dark:border-slate-700 dark:bg-slate-900">
          {children}
        </div>
      </div>
      {viewport.height > 400 && <AdminNavigationMobile />}
    </div>
  )
}

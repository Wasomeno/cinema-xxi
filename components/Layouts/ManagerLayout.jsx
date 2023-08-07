import Head from "next/head"
import { useRouter } from "next/router"
import { useViewport } from "hooks/useViewport"
import { useSession } from "next-auth/react"

import { ManagerNavigation } from "../Navigations/Manager/ManagerNavigation"
import { ManagerNavigationMobile } from "../Navigations/Manager/ManagerNavigationMobile"
import { ManagerToolbar } from "../Navigations/ManagerToolbar"
import { Spinner } from "../Spinner"

export const ManagerLayout = ({ children, pageTitle = "" }) => {
  const router = useRouter()
  const { data: sessionData, status } = useSession()
  const viewport = useViewport()

  if (status === "loading")
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spinner />
      </div>
    )

  if (status !== "loading" && sessionData?.user.role !== "manager") {
    router.push("/manager/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Head>
        <title>Manager | {pageTitle}</title>
        <meta property="description" content="Manager page" />
      </Head>
      <ManagerToolbar />
      <div className="flex flex-1 justify-center gap-4 p-4">
        {viewport.width > 1024 && <ManagerNavigation />}
        <div className="flex w-full overflow-y-scroll rounded-lg border bg-white dark:border-slate-700 dark:bg-slate-900">
          {children}
        </div>
      </div>
      {viewport.width < 1024 && viewport.height > 500 && (
        <ManagerNavigationMobile />
      )}
    </div>
  )
}

import Head from "next/head"
import { useViewport } from "hooks/useViewport"

import AppNavigation from "../Navigations/App/AppNavigation"
import AppNavigationMobile from "../Navigations/App/AppNavigationMobile"

const AppLayout = ({ children, pageTitle }) => {
  const viewport = useViewport()
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white dark:bg-slate-950">
      <Head>
        <title>{`XXI Cinema App  ${pageTitle ? `| ${pageTitle}` : ""}`}</title>
        <meta property="description" content="App page" />
      </Head>
      <AppNavigation />
      <div className="relative flex flex-1 flex-col">{children}</div>
      {viewport.width < 1024 && viewport.height > 500 && (
        <AppNavigationMobile />
      )}
    </div>
  )
}

export default AppLayout

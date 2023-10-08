import { useEffect } from "react"
import Head from "next/head"
import { useAccount, useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

import AppNavigation from "../Navigations/App/AppNavigation"
import AppNavigationMobile from "../Navigations/App/AppNavigationMobile"

const AppLayout = ({ children, title }) => {
  const { connect } = useConnect()
  const { isConnected } = useAccount()

  useEffect(() => {
    const isMetamaskConnected =
      localStorage.getItem("isMetamaskConnected") !== null
    if (isMetamaskConnected && !isConnected) {
      connect({
        chainId: 11155111,
        connector: new MetaMaskConnector(),
      })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white dark:bg-slate-950">
      <Head>
        <title>{`${title ?? ""}`}</title>
        <meta property="description" content="App page" />
      </Head>
      <AppNavigation />
      <div className="relative flex flex-1 flex-col">{children}</div>
      <AppNavigationMobile />
    </div>
  )
}

export default AppLayout

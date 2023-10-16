"use client"

import { ReactNode, useEffect } from "react"
import { useAccount, useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

export function WalletAutoReconnect({ children }: { children: ReactNode }) {
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

  return children
}

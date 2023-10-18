"use client"

import { ReactNode, useEffect } from "react"
import { useAccount, useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

import { WalletNotConnected } from "../WalletNotConnected"

export function WalletConnection({ children }: { children: ReactNode }) {
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
  }, [isConnected])

  if (!isConnected) return <WalletNotConnected />
  return children
}

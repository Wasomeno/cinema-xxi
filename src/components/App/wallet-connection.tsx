"use client"

import { ReactNode, useEffect } from "react"
import { useAccount, useConnect } from "wagmi"

import { WalletNotConnected } from "../wallet-not-connected"

export function WalletConnection({ children }: { children: ReactNode }) {
  const { connect } = useConnect()
  const { isConnected } = useAccount()

  useEffect(() => {
    const isMetamaskConnected =
      localStorage.getItem("isMetamaskConnected") !== null
    if (isMetamaskConnected && !isConnected) {
    }
  }, [isConnected])

  if (!isConnected) return <WalletNotConnected />
  return children
}

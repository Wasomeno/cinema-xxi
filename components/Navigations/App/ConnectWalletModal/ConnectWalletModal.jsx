import React from "react"
import { useConnect } from "wagmi"

import { CenteredModalContainer } from "@/components/ModalContainer"

import {
  WalletError,
  WalletIdle,
  WalletLoading,
  WalletSuccess,
} from "./WalletStatusComponents"

export const ConnectWalletModal = ({ toggleWalletModal }) => {
  const { connect, connectors, status, error } = useConnect()
  const walletComponents = {
    loading: WalletLoading,
    error: WalletError,
    success: WalletSuccess,
    idle: WalletIdle,
  }
  const WalletStatusComponent = walletComponents[status]
  return (
    <CenteredModalContainer
      closeModal={toggleWalletModal}
      className="flex h-72 w-full flex-col items-center gap-2 p-4 lg:h-80 lg:w-80"
    >
      <div className="h-5/6 w-full">
        <WalletStatusComponent
          connectors={connectors}
          connect={connect}
          error={error}
          toggleWalletModal={toggleWalletModal}
        />
      </div>
    </CenteredModalContainer>
  )
}

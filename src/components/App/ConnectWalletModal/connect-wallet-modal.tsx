"use client"

import React, { Dispatch, SetStateAction } from "react"
import { useConnect } from "wagmi"

import { CenteredModal } from "@/components/modal"

import {
  WalletError,
  WalletIdle,
  WalletLoading,
  WalletSuccess,
} from "./WalletStatuses"

type ConnectWalletModalProps = {
  toggle: () => void
}

export function ConnectWalletModal({ toggle }: ConnectWalletModalProps) {
  const { connect, connectors, status, error } = useConnect()
  const walletStatuses = {
    loading: WalletLoading,
    error: WalletError,
    success: WalletSuccess,
    idle: WalletIdle,
  }

  const WalletStatus = walletStatuses[status]

  return (
    <CenteredModal
      closeModal={toggle}
      className="flex h-72 w-full flex-col items-center gap-2 bg-slate-50 p-4 dark:bg-slate-800 lg:h-80 lg:w-80"
    >
      <div className="h-5/6 w-full">
        <WalletStatus
          connectors={connectors}
          connect={connect}
          message={error?.message}
          toggle={toggle}
        />
      </div>
    </CenteredModal>
  )
}

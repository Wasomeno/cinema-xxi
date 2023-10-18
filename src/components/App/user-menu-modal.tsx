"use client"

import { useToast } from "@/stores/toastStore"
import { IconType } from "react-icons"
import { HiOutlineClipboardDocument, HiPower } from "react-icons/hi2"
import { RiShareBoxFill } from "react-icons/ri"
import { useAccount, useBalance, useDisconnect } from "wagmi"

import { Modal } from "../modal"
import { ThemeSwitcher } from "../ThemeSwitcher"

const UserMenuModal = ({ toggle }: { toggle: () => void }) => {
  const toast = useToast()
  const { address, isDisconnected, isConnected } = useAccount()
  const { data: walletBalance } = useBalance({ address: address })
  const { disconnect } = useDisconnect()

  const connectedAddress = isConnected ? (address?.toString() as string) : ""

  const iconWrapper = (Icon: IconType) => (
    <Icon size="16" className="text-slate-700 dark:text-slate-200" />
  )

  function openEtherScan() {
    if (typeof window === "undefined") return
    window
      .open(`https://sepolia.etherscan.io/address/${connectedAddress}`)
      ?.focus()
  }

  function copyAddress() {
    navigator.clipboard.writeText(connectedAddress)
    toast.success("Address Copied")
  }

  function disconnectWallet() {
    disconnect()
    toggle()
    toast.error("Wallet Disconnected")
  }

  if (isDisconnected) return
  return (
    <Modal
      closeModal={toggle}
      className="flex h-80 w-full flex-col gap-4 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 md:right-5 md:top-14 md:h-96 md:w-80 lg:border"
    >
      <div className="mx-auto h-1 w-2/6 rounded-full bg-gray-400 bg-opacity-25 lg:hidden" />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-2.5 md:w-3/6">
          <div className="h-8 w-8 rounded-full border-2 bg-blue-400" />
          <p className="font-poppins text-sm font-medium tracking-wider text-slate-900 dark:text-slate-50">
            {connectedAddress.slice(0, 4)}...
            {`${connectedAddress.slice(-4, -1)}${connectedAddress.slice(-1)}`}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 md:w-3/6">
          <button
            onClick={copyAddress}
            className="rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
          >
            {iconWrapper(HiOutlineClipboardDocument)}
          </button>
          <button
            onClick={openEtherScan}
            className="rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
          >
            {iconWrapper(RiShareBoxFill)}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("isMetamaskConnected")
              disconnectWallet()
            }}
            className="rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
          >
            {iconWrapper(HiPower)}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-openSans text-sm text-slate-900 dark:text-slate-50">
          ETH Balance
        </span>
        <span className="font-poppins text-2xl tracking-wider text-slate-900 dark:text-slate-50">
          {walletBalance?.formatted.slice(0, 4)} ETH
        </span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between rounded-lg bg-slate-200  p-3 font-openSans text-sm text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-50">
          <span>Theme</span>
          <ThemeSwitcher />
        </div>
      </div>
    </Modal>
  )
}

export default UserMenuModal

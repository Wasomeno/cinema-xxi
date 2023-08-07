import { useTheme } from "next-themes"
import { HiOutlineClipboardDocument, HiPower } from "react-icons/hi2"
import { RiShareBoxFill } from "react-icons/ri"
import { useToast } from "stores/toastStore"
import { twMerge } from "tailwind-merge"
import { useAccount, useBalance, useDisconnect } from "wagmi"

import { ModalContainer } from "./ModalContainer"

const UserMenuModal = ({ toggleShowUserModal }) => {
  const [toastSuccess, toastError] = useToast()
  const { address, isDisconnected } = useAccount()
  const { setTheme, theme, systemTheme } = useTheme()
  const { data: walletBalance } = useBalance({ address: address })
  const { disconnect } = useDisconnect()

  const currentTheme = theme === "system" ? systemTheme : theme

  const iconWrapper = (Icon) => (
    <Icon size="16" className="text-slate-700 dark:text-slate-200" />
  )

  function openEtherScan() {
    window
      .open("https://sepolia.etherscan.io/address/" + address, "_blank")
      .focus()
  }

  function copyAddress() {
    navigator.clipboard.writeText(address)
    toastSuccess("Address Copied")
  }

  function disconnectWallet() {
    toggleShowUserModal()
    disconnect()
    toastError("Wallet Disconnected")
  }

  if (isDisconnected) return
  return (
    <ModalContainer
      closeModal={toggleShowUserModal}
      className="bottom-0 h-80 w-full gap-4 rounded-t-lg p-4 md:right-5 md:top-14 md:h-96 md:w-80 md:rounded-lg"
    >
      <div className="mx-auto h-1 w-2/6 rounded-full bg-gray-400 bg-opacity-25" />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-2.5 md:w-3/6">
          <div className="h-8 w-8 rounded-full border-2 bg-blue-400" />
          <p className="font-poppins text-sm font-medium tracking-wider text-slate-900 dark:text-slate-50">
            {address.slice(0, 4)}...
            {address.slice(-4, -1) + address.slice(-1)}
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
            onClick={disconnectWallet}
            className="rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
          >
            {iconWrapper(HiPower)}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-poppins text-sm text-slate-900 dark:text-slate-50">
          ETH Balance
        </span>
        <span className="font-poppins text-2xl tracking-wider text-slate-900 dark:text-slate-50">
          {walletBalance?.formatted.slice(0, 4)} ETH
        </span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between rounded-lg bg-slate-200  p-3 font-poppins text-sm text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-50">
          <span>Theme</span>
          <button
            onClick={() => {
              if (currentTheme === "dark") {
                setTheme("light")
              } else {
                setTheme("dark")
              }
            }}
            className={twMerge(
              "relative flex h-5 w-2/12 items-center justify-between rounded-full transition-all duration-300 ease-in-out",
              currentTheme === "light" && "bg-gray-400",
              currentTheme === "dark" && "bg-slate-800"
            )}
          >
            <span
              className={twMerge(
                "absolute h-4 w-4 rounded-full bg-slate-50 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out",
                currentTheme === "light" && "left-0",
                currentTheme === "dark" && "right-0"
              )}
            />
          </button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default UserMenuModal

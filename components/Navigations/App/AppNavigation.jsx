import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import useToggle from "hooks/useToggle"
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails"
import { HiOutlineSearch } from "react-icons/hi"
import { HiOutlineRectangleStack, HiOutlineTicket } from "react-icons/hi2"

import UserMenuModal from "@/components/UserMenuModal"

import { ConnectWalletModal } from "./ConnectWalletModal"
import { SearchModal } from "./SearchModal"

export const appPaths = [
  {
    href: "/app/cinemas",
    Icon: (
      <HiOutlineRectangleStack
        size={25}
        className="text-slate-800 dark:text-slate-100"
      />
    ),
  },
  {
    href: "/app/transactions",
    Icon: (
      <HiOutlineTicket
        size={25}
        className="text-slate-800 dark:text-slate-100"
      />
    ),
  },
]

const AppNavigation = () => {
  const { isConnected, user } = useUserConnectionDetails()

  const [showUserModal, toggleShowUserModal] = useToggle(false)
  const [showSearchModal, toggleShowSearchModal] = useToggle(false)
  const [showWalletModal, toggleShowWalletModal] = useToggle(false)

  return (
    <div
      className={
        "sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white px-4 py-2 dark:border-b-slate-800 dark:bg-slate-950 lg:h-16"
      }
    >
      <div className="flex w-auto items-center gap-4 lg:w-3/6">
        <Link href="/app" className="text-center lg:w-28">
          <span className="font-poppins text-base font-semibold tracking-tight lg:text-xl">
            Cinema
          </span>
        </Link>
        <button onClick={toggleShowSearchModal}>
          <HiOutlineSearch
            size={18}
            className="text-slate-800 dark:text-slate-100"
          />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          {appPaths.map((path) => (
            <Link
              key={path.text}
              href={path.href}
              className="hidden p-2 text-center font-poppins text-xs tracking-wider md:text-sm lg:block"
            >
              {path.Icon}
            </Link>
          ))}
        </div>
        <div className="hidden h-6 w-[2px] rounded-full bg-slate-200 dark:bg-slate-600 lg:block" />
        <div className="text-center">
          {isConnected ? (
            <button
              onClick={toggleShowUserModal}
              className="flex items-center justify-center gap-2 rounded-full border border-transparent p-1 transition duration-300 ease-in-out"
            >
              <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-blue-400 md:h-8 md:w-8" />
              <span className="hidden font-poppins text-xs font-medium sm:hidden sm:text-sm md:block">
                {user.slice(0, 6)}...
                {user.slice(-6, -1) + user.slice(-1)}
              </span>
            </button>
          ) : (
            <button
              onClick={toggleShowWalletModal}
              className="rounded-lg bg-slate-900 px-3 py-2 font-poppins text-xs font-medium text-white dark:bg-white dark:text-slate-950"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showWalletModal && (
          <ConnectWalletModal toggleWalletModal={toggleShowWalletModal} />
        )}
        {showUserModal && (
          <UserMenuModal toggleShowUserModal={toggleShowUserModal} />
        )}
        {showSearchModal && <SearchModal toggleModal={toggleShowSearchModal} />}
      </AnimatePresence>
    </div>
  )
}

export default AppNavigation

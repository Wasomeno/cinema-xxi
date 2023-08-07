import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import useToggle from "hooks/useToggle"
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails"

import UserMenuModal from "@/components/UserMenuModal"

import { ConnectWalletModal } from "./ConnectWalletModal"

export const appPaths = [
  {
    text: "Home",
    href: "/app",
  },
  {
    text: "Cinemas",
    href: "/app/cinemas",
  },
  {
    text: "Transactions",
    href: "/app/transactions",
  },
]

const AppNavigation = () => {
  const { isConnected, user } = useUserConnectionDetails()
  const [showWalletModal, toggleShowWalletModal] = useToggle(false)
  const [showUserModal, toggleShowUserModal] = useToggle(false)

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white px-4 py-2 dark:border-b-slate-700 dark:bg-slate-900 lg:h-16">
      <div className="w-auto p-2 text-center lg:w-1/12">
        <span className="font-inter border-2 border-slate-900 bg-slate-50 px-2 text-xs tracking-widest text-slate-900 sm:text-base md:text-base">
          XXI
        </span>
      </div>
      <div className="hidden w-2/6 justify-evenly gap-5 md:flex">
        {appPaths.map((path) => (
          <Link
            key={path.text}
            href={path.href}
            className="p-2 text-center font-poppins text-xs tracking-wider md:text-sm"
          >
            {path.text}
          </Link>
        ))}
      </div>
      <div className="w-auto text-center">
        {isConnected ? (
          <button
            onClick={() => toggleShowUserModal()}
            className="flex items-center justify-center gap-2 rounded-full border border-transparent p-1 transition duration-300 ease-in-out"
          >
            <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-blue-400 md:h-8 md:w-8" />
            <span className="hidden font-poppins text-xs sm:hidden sm:text-sm md:block">
              {user.slice(0, 6)}...
              {user.slice(-6, -1) + user.slice(-1)}
            </span>
          </button>
        ) : (
          <button
            onClick={() => toggleShowWalletModal()}
            className="w-20 rounded-md bg-slate-900 p-1.5 font-openSans text-xs font-medium text-white dark:bg-white dark:text-slate-950 lg:text-xs"
          >
            Connect
          </button>
        )}
      </div>
      <AnimatePresence>
        {showWalletModal && (
          <ConnectWalletModal toggleWalletModal={toggleShowWalletModal} />
        )}
        {showUserModal && (
          <UserMenuModal toggleShowUserModal={toggleShowUserModal} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppNavigation

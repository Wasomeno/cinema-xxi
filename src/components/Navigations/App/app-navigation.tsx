"use client"

import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { AnimatePresence } from "framer-motion"
import { HiOutlineSearch } from "react-icons/hi"
import { HiOutlineRectangleStack, HiOutlineTicket } from "react-icons/hi2"
import { useAccount } from "wagmi"

import { useToggle } from "@/hooks/useToggle"
import UserMenuModal from "@/components/App/user-menu-modal"

import { SearchModal } from "./search-modal"

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

export function AppNavigation() {
  const { address, isConnected } = useAccount()

  const [showUserModal, toggleShowUserModal] = useToggle(false)
  const [showSearchModal, toggleShowSearchModal] = useToggle(false)

  return (
    <header
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
          <HiOutlineSearch className="text-slate-800 dark:text-slate-100 lg:h-5 lg:w-5" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          {appPaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="hidden p-2 text-center font-poppins text-xs tracking-wider md:text-sm lg:block"
            >
              {path.Icon}
            </Link>
          ))}
        </div>
        <div className="hidden h-6 w-[2px] rounded-full bg-slate-200 dark:bg-slate-600 lg:block" />
        <div className="text-center">
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        {showUserModal && <UserMenuModal toggle={toggleShowUserModal} />}
        {showSearchModal && <SearchModal toggleModal={toggleShowSearchModal} />}
      </AnimatePresence>
    </header>
  )
}

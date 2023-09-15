import { useState } from "react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"

import ManagerMenuModal from "../Manager/ManagerMenuModal"
import { ThemeSwitcher } from "../ThemeSwitcher"

export const ManagerToolbar = () => {
  const [showMenuModal, setShowMenuModal] = useState(false)
  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-4 dark:border-b-slate-700 dark:bg-slate-900">
      <div className="flex w-5/6 items-center justify-start gap-4">
        <Link href="/manager" className="text-center lg:w-28">
          <span className="font-poppins text-base font-semibold tracking-tight lg:text-xl">
            Cinema
          </span>
        </Link>
      </div>

      <div className="flex w-2/6 justify-end gap-4">
        <ThemeSwitcher />
        <button
          onClick={() => setShowMenuModal(true)}
          className="h-8 w-8 rounded-full bg-blue-200 shadow-sm lg:h-10 lg:w-10"
        />
      </div>

      <AnimatePresence>
        {showMenuModal && (
          <ManagerMenuModal closeModal={() => setShowMenuModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

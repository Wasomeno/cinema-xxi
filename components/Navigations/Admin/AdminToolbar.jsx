import { useState } from "react"
import { AnimatePresence } from "framer-motion"

import AdminMenuModal from "@/components/AdminMenuModal"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"

export const AdminToolbar = () => {
  const [search, setSearch] = useState("")
  const [showMenuModal, setShowMenuModal] = useState(false)
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-4 dark:border-b-slate-700 dark:bg-slate-900">
      <div className="flex w-5/6 items-center justify-start gap-4">
        <div className="lg:w-[240px]">
          <span className="border-2 border-slate-800 px-2 py-1.5 font-poppins text-xs font-semibold tracking-wider dark:border-slate-100 lg:px-4 lg:text-lg">
            XXI
          </span>
        </div>
        <div className="w-4/6 lg:w-3/6">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-900 lg:text-sm"
          />
        </div>
      </div>

      <div className="flex w-2/6 items-center justify-end gap-4">
        <ThemeSwitcher />
        <button
          onClick={() => setShowMenuModal(true)}
          className="h-8 w-8 rounded-full bg-blue-200 shadow-sm lg:h-10 lg:w-10"
        />
      </div>

      <AnimatePresence>
        {showMenuModal && (
          <AdminMenuModal closeModal={() => setShowMenuModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

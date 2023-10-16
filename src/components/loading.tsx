"use client"

import { AnimatePresence } from "framer-motion"

import { useLoadingDetails } from "../stores/loadingStore"
import { CenteredModal } from "./modal"
import { Spinner } from "./spinner"

export function Loading() {
  const { loading, text } = useLoadingDetails()
  return (
    <AnimatePresence>
      {loading && (
        <CenteredModal className="flex h-3/6 flex-col items-center justify-center gap-5 bg-slate-50 dark:bg-slate-800 lg:h-80 lg:w-72 ">
          <span className="font-poppins text-sm font-medium lg:text-base">
            {text}
          </span>
          <Spinner />
        </CenteredModal>
      )}
    </AnimatePresence>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { useViewport } from "@/hooks/useViewport"

import { useToastDetails } from "../stores/toastStore"

export function Toast() {
  const toastDetails = useToastDetails()
  const viewport = useViewport()

  const toastTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (toastDetails.show) {
      toastTimeoutRef.current = setTimeout(
        () => toastDetails.setShow(false),
        2500
      )
    }
    return () => {
      clearTimeout(toastTimeoutRef.current)
    }
  }, [toastDetails.show])

  return (
    <AnimatePresence>
      {toastDetails.show && (
        <motion.div
          initial={{ opacity: 0, bottom: -5, scale: 0.3 }}
          animate={{
            opacity: 1,
            bottom: viewport.width < 1024 ? 0 : 20,
            scale: 1,
          }}
          exit={{ opacity: 0, bottom: -5, scale: 0.5 }}
          style={{ translateX: "-50%" }}
          className={
            "fixed left-1/2 z-30 flex h-14 w-full items-center gap-4 rounded-t-lg border border-t bg-slate-50 px-4 text-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-800 lg:left-1/2 lg:w-80 lg:rounded-lg lg:border"
          }
        >
          <span>{toastDetails.icon}</span>
          <span className="font-poppins text-xs text-slate-800 dark:font-medium dark:text-slate-100 lg:text-sm">
            {toastDetails.text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

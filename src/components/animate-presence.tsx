"use client"

import { PropsWithChildren } from "react"
import { AnimatePresence } from "framer-motion"

export function ClientAnimatePresence({ children }: PropsWithChildren) {
  return <AnimatePresence>{children}s</AnimatePresence>
}

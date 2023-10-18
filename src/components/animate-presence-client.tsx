"use client"

import { ReactNode } from "react"
import { AnimatePresence } from "framer-motion"

export function AnimatePresenceClient({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>
}

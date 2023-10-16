"use client"

import { HTMLAttributes, ReactNode } from "react"
import { HTMLMotionProps, motion } from "framer-motion"

interface AnimatedContainerProps
  extends HTMLAttributes<HTMLMotionProps<"div">> {
  children?: ReactNode
}

export function AnimatedContainer({
  children,
  className,
  onClick,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className={className}
      onClick={onClick as () => void}
    >
      {children}
    </motion.div>
  )
}

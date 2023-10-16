import { HTMLAttributes } from "react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom"
import { HiXMark } from "react-icons/hi2"
import { twMerge } from "tailwind-merge"

import { cn } from "@/lib/utils"
import { useViewport } from "@/hooks/useViewport"

import { AnimatedContainer } from "./animated-container"

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal?: () => void
}

export function Modal({ children, className, closeModal }: ModalProps) {
  const { width } = useViewport()

  const portalContainer = document.getElementById(
    "modal-portal-container"
  ) as HTMLElement

  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, bottom: width <= 500 ? "-50px" : 0 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: width <= 500 ? 0.1 : 0,
        }}
        exit={{ opacity: 0, bottom: width <= 500 ? "-50px" : 0 }}
        className={twMerge(
          "fixed  z-40 w-full rounded-none rounded-t-lg px-4 py-2 shadow-md lg:rounded-lg",
          className
        )}
      >
        {children}
      </motion.div>
    </>,
    portalContainer
  )
}

export const CenteredModal = ({
  children,
  className,
  closeModal,
}: ModalProps) => {
  const { width } = useViewport()

  const portalContainer = document.getElementById(
    "modal-portal-container"
  ) as HTMLElement

  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, bottom: width <= 500 ? "-50px" : 0 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: width <= 500 ? 0.1 : 0,
        }}
        exit={{ opacity: 0, bottom: width <= 500 ? "-50px" : 0 }}
        className={twMerge(
          "fixed inset-x-1/2 z-40 h-[90%] w-full -translate-x-1/2 flex-col rounded-none rounded-t-2xl p-4 shadow-md sm:h-3/6 sm:w-4/6 lg:inset-y-1/2 lg:h-5/6 lg:w-4/6 lg:-translate-y-1/2 lg:rounded-xl",
          className
        )}
      >
        {children}
      </motion.div>
    </>,
    portalContainer
  )
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
}

export const ModalHeader = ({
  className,
  title,
  closeModal,
}: ModalHeaderProps) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <h3 className="font-poppins text-sm font-medium lg:text-base">{title}</h3>
      <button onClick={closeModal}>
        <HiXMark size="20" />
      </button>
    </div>
  )
}

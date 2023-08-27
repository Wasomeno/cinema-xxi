import { cn } from "lib/utils"
import { createPortal } from "react-dom"
import { HiXMark } from "react-icons/hi2"
import { twMerge } from "tailwind-merge"

import AnimatedContainer from "./AnimatedContainer"

export const Modal = ({ children, className, closeModal }) => {
  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm"
      />
      <AnimatedContainer
        className={twMerge(
          "fixed bottom-0 z-40 w-full rounded-none rounded-t-lg px-4 py-2 shadow-md lg:rounded-lg",
          className
        )}
      >
        {children}
      </AnimatedContainer>
    </>,
    document.getElementById("modal-portal-container")
  )
}

export const CenteredModal = ({ children, className, closeModal }) => {
  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm"
      />
      <AnimatedContainer
        className={twMerge(
          "fixed inset-x-1/2 bottom-0 z-40 h-[90%] w-full -translate-x-1/2 flex-col rounded-none rounded-t-2xl px-4 py-2 shadow-md sm:h-3/6 sm:w-4/6 lg:inset-y-1/2 lg:h-5/6 lg:w-4/6 lg:-translate-y-1/2 lg:rounded-xl",
          className
        )}
      >
        {children}
      </AnimatedContainer>
    </>,
    document.getElementById("modal-portal-container")
  )
}

export const ModalHeader = ({ className, title, closeModal }) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <h3 className="font-poppins text-sm font-medium lg:text-base">{title}</h3>
      <button onClick={closeModal}>
        <HiXMark size="20" />
      </button>
    </div>
  )
}

import { createPortal } from "react-dom"
import { HiXMark } from "react-icons/hi2"
import { twMerge } from "tailwind-merge"

import AnimatedContainer from "./AnimatedContainer"

export const ModalContainer = ({ children, className, closeModal, title }) => {
  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm dark:bg-slate-950 dark:bg-opacity-50"
      />
      <AnimatedContainer
        className={twMerge(
          "fixed bottom-0 z-40 flex w-full flex-1 flex-col rounded-none rounded-t-lg bg-white px-6 py-4 shadow-md dark:bg-slate-900 lg:rounded-lg",
          className
        )}
      >
        {title && (
          <div className="my-2 flex items-center justify-between">
            <h3 className="font-poppins text-sm font-medium lg:text-base">
              {title}
            </h3>
            <button onClick={closeModal}>
              <HiXMark size="20" />
            </button>
          </div>
        )}

        {children}
      </AnimatedContainer>
    </>,
    document.getElementById("modal-portal-container")
  )
}

export const CenteredModalContainer = ({
  children,
  className,
  closeModal,
  title,
}) => {
  return createPortal(
    <>
      <AnimatedContainer
        onClick={closeModal}
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-slate-800 bg-opacity-50 backdrop-blur-sm dark:bg-opacity-50"
      />
      <AnimatedContainer
        className={twMerge(
          "fixed inset-x-1/2 bottom-0 z-40 flex h-[90%] w-full -translate-x-1/2 flex-col rounded-none rounded-t-lg bg-white px-6 py-4 shadow-md dark:bg-slate-900 sm:h-3/6 sm:w-4/6 lg:inset-y-1/2 lg:h-5/6 lg:w-4/6 lg:-translate-y-1/2 lg:rounded-lg",
          className
        )}
      >
        {title && (
          <div className="my-2 flex w-full items-center justify-between">
            <h3 className="font-poppins text-sm font-medium lg:text-base">
              {title}
            </h3>
            <button onClick={closeModal}>
              <HiXMark size="20" />
            </button>
          </div>
        )}

        {children}
      </AnimatedContainer>
    </>,
    document.getElementById("modal-portal-container")
  )
}

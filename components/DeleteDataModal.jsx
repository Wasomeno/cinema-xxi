import { RxCrossCircled } from "react-icons/rx"

import { CenteredModal } from "@/components/Modal"

export const DeleteDataModal = ({
  closeModal,
  title,
  description,
  deleteFunction,
}) => {
  return (
    <CenteredModal
      closeModal={closeModal}
      className="h-72 w-full bg-slate-50 dark:bg-slate-900 lg:h-80 lg:w-80"
    >
      <div className="flex h-5/6 w-full flex-col items-center justify-center gap-2">
        <h5 className="font-poppins text-sm font-medium tracking-wider lg:text-base">
          {title}
        </h5>
        <RxCrossCircled size="30" className="text-red-600 dark:text-red-700" />
        <p className="text-xs tracking-wider lg:text-sm">{description}</p>
      </div>
      <div className="flex h-1/6 items-center justify-center gap-4">
        <button
          onClick={() => {
            closeModal()
            deleteFunction()
          }}
          className="h-9 w-28 rounded-lg bg-green-600 text-xs text-slate-100 dark:bg-green-800 lg:text-sm"
        >
          Continue
        </button>
        <button
          onClick={closeModal}
          className="h-9 w-28 rounded-lg bg-red-600 text-xs text-slate-100 dark:bg-red-800 lg:text-sm"
        >
          Cancel
        </button>
      </div>
    </CenteredModal>
  )
}

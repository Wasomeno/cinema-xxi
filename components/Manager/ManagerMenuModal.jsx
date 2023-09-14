import { signOut, useSession } from "next-auth/react"
import { HiPower } from "react-icons/hi2"

import { Modal } from "../Modal"

const ManagerMenuModal = ({ closeModal }) => {
  const { data: sessionData } = useSession()

  if (!sessionData) return
  return (
    <Modal
      closeModal={closeModal}
      className="flex h-80 w-full flex-col gap-4 bg-slate-50 p-4 dark:bg-slate-800 lg:right-5 lg:top-14 lg:h-96 lg:w-80"
    >
      <div className="mx-auto h-1 w-2/6 rounded-full bg-gray-400 bg-opacity-25" />
      <div className="flex w-full items-center justify-between">
        <div className="flex w-5/12 items-center justify-between md:w-3/6">
          <div className="h-8 w-8 rounded-full border-2 bg-blue-400" />
          <p className="w-8/12 font-poppins text-sm font-medium tracking-wider text-slate-900 dark:text-slate-50">
            {sessionData.user.name}
          </p>
        </div>
        <div className="flex w-2/6 items-center justify-end gap-2 md:w-3/6">
          <button
            onClick={() => signOut({ redirect: "/manager/login" })}
            className="rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
          >
            <HiPower size="16" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2"></div>
    </Modal>
  )
}

export default ManagerMenuModal

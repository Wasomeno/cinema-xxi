import { signOut, useSession } from "next-auth/react"
import { HiOutlineChevronRight, HiPower } from "react-icons/hi2"

import AnimatedContainer from "./AnimatedContainer"
import { ModalContainer } from "./ModalContainer"

const AdminMenuModal = ({ closeModal }) => {
  const { data: sessionData } = useSession()

  if (!sessionData) return
  return (
    <ModalContainer
      closeModal={closeModal}
      className="bottom-0 z-20 flex h-80 w-full flex-col gap-4 rounded-t-lg bg-slate-100 p-4 dark:bg-slate-700 md:right-5 md:top-12 md:h-96 md:w-80 md:rounded-lg"
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
            onClick={() => signOut({ redirect: false })}
            className="rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
          >
            <HiPower size="16" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <button className="flex w-full justify-between rounded-md bg-slate-400 bg-opacity-25 p-3 font-poppins text-sm text-slate-900 first-letter:items-center dark:text-slate-50">
          <span>Actions</span>
          <HiOutlineChevronRight size="5" />
        </button>
      </div>
    </ModalContainer>
  )
}

export default AdminMenuModal

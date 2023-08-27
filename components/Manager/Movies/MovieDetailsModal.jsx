import { useRouter } from "next/router"

import { CenteredModal, ModalHeader } from "@/components/Modal"

export const MovieDetailsModal = ({ closeModal }) => {
  const { query } = useRouter()
  return (
    <CenteredModal
      closeModal={closeModal}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-3/6"
    >
      <ModalHeader title="Movie Details" closeModal={closeModal} />
    </CenteredModal>
  )
}

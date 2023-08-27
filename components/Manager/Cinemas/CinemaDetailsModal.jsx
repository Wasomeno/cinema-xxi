import { CenteredModal, ModalHeader } from "@/components/Modal"

export const CinemaDetailsModal = ({ closeModal }) => {
  return (
    <CenteredModal
      closeModal={closeModal}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900"
    >
      <ModalHeader
        title="Cinema Details"
        className="mb-4"
        closeModal={closeModal}
      />
    </CenteredModal>
  )
}

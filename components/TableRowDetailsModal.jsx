import { CenteredModal, ModalHeader } from "./Modal"

export const TableRowDetailsModal = ({ title, children, closeModal }) => {
  return (
    <CenteredModal
      closeModal={closeModal}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900"
    >
      <ModalHeader title={title} closeModal={closeModal} className="mb-4" />
      {children}
    </CenteredModal>
  )
}

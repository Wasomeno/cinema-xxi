import { CenteredModalContainer } from "@/components/ModalContainer"

export const CinemaDetailsModal = ({ closeModal }) => {
  return (
    <CenteredModalContainer
      title="Cinema Details"
      closeModal={closeModal}
    ></CenteredModalContainer>
  )
}

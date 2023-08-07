import { useRouter } from "next/router"

import { CenteredModalContainer } from "@/components/ModalContainer"

export const MovieDetailsModal = ({ closeModal }) => {
  const { query } = useRouter()
  return (
    <CenteredModalContainer
      title="Movie Details"
      closeModal={closeModal}
      className="lg:h-4/6 lg:w-3/6"
    ></CenteredModalContainer>
  )
}

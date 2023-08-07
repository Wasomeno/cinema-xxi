import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"
import { HiXMark } from "react-icons/hi2"

import { CenteredModalContainer } from "@/components/ModalContainer"

export const TransactionDetailsModal = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return
  return (
    <CenteredModalContainer
      title="Transaction Details"
      closeModal={() => router.push("/app/transactions")}
      className="rounded-t-lg lg:h-4/6 lg:w-2/6 lg:rounded-lg"
    ></CenteredModalContainer>
  )
}

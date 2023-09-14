import { useRouter } from "next/router"

import { CenteredModal } from "@/components/Modal"

export const TransactionDetailsModal = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return
  return (
    <CenteredModal
      title="Transaction Details"
      closeModal={() => router.push("/app/transactions")}
      className="h-5/6 rounded-t-lg bg-slate-50 dark:bg-slate-800 lg:h-4/6 lg:w-2/6 lg:rounded-lg"
    ></CenteredModal>
  )
}

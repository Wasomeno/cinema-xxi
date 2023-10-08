import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

import { CenteredModal } from "@/components/Modal"

export const TransactionDetailsModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id } = router.query

  if (!id) return
  return (
    <CenteredModal
      title="Transaction Details"
      closeModal={() => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete("id")
        router.replace(`${router.pathname}?${newSearchParams.toString()}`)
      }}
      className="h-5/6 rounded-t-lg bg-slate-50 dark:bg-slate-800 lg:h-4/6 lg:w-2/6 lg:rounded-lg"
    ></CenteredModal>
  )
}

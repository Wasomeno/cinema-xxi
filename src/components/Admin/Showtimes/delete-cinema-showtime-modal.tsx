"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const DeleteShowtimeModal = () => {
  const { data: sessionData } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const selectedShowtimes = JSON.parse(
    localStorage.getItem("selectedDatas") as string
  )

  const sideEffects = useSideEffects({
    text: "Deleting showtimes",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinema?.id),
  })

  const deleteShowtimes = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/showtimes/delete`,
    method: "POST",
    body: {
      showtimeIds: selectedShowtimes,
    },
    sideEffects: sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Showtimes"
      description={`Remove ${selectedShowtimes.length} selected showtimes?`}
      closeModal={() => router.replace(pathname)}
      deleteFunction={deleteShowtimes.mutate}
    />
  )
}

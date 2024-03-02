"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"

export const DeleteStudioShowtimesModal = () => {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const sideEffects = useSideEffects({
    text: "Deleting studio showtimes",
    queryKeys: ["studioShowtimes", params.studioId as string],
  })

  const selectedShowtimes: number[] = JSON.parse(
    localStorage.getItem("selectedDatas") as string
  )

  const deleteStudioShowtimes = mutation({
    url: `/api/cinemas/${session.data?.user.cinema?.id}/studios/${params.studioId}/showtimes/delete`,
    method: "POST",
    body: { showtimeIds: selectedShowtimes },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Studio Showtimes"
      description="Continue delete studio showtimes ?"
      deleteFunction={deleteStudioShowtimes.mutate}
      closeModal={() => router.replace(pathname)}
    />
  )
}

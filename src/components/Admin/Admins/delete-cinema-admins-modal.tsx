"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const DeleteCinemaAdminsModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  const sideEffects = useSideEffects({
    text: "Deleting cinema admins",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinema?.id),
  })

  const selectedAdmins: number[] = JSON.parse(
    localStorage.getItem("selectedDatas") as string
  )

  const deleteCineaAdmins = mutation({
    url: `/api/cinemas/${session.data?.user.cinema?.id}/admins/delete`,
    method: "POST",
    body: {
      adminIds: selectedAdmins,
    },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Cinema Admins"
      description={`Continue delete ${selectedAdmins.length} selected admins ?`}
      closeModal={() => router.replace(pathname)}
      deleteFunction={deleteCineaAdmins.mutate}
    />
  )
}

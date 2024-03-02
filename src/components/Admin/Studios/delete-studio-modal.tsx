"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export function DeleteStudioModal() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: sessionData } = useSession()

  const sideEffects = useSideEffects({
    text: "Deleting studio",
    queryKeys: cinemaStudioQueryKeys.allStudio,
  })

  const selectedStudios: number[] = JSON.parse(
    localStorage.getItem("selectedDatas") as string
  )

  const deleteStudio = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/studios/delete`,
    method: "POST",
    body: { studioIds: selectedStudios },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Studio"
      description={`Remove ${selectedStudios.length} selected studios?`}
      deleteFunction={deleteStudio.mutate}
      closeModal={() => router.replace(pathname)}
    />
  )
}

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export function DeleteStudioModal({
  selectedStudio,
}: {
  selectedStudio: number[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: sessionData } = useSession()
  const sideEffects = useSideEffects({
    text: "Deleting studio",
    queryKeys: cinemaStudioQueryKeys.allStudio,
  })

  const deleteStudio = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/studios/delete`,
    method: "POST",
    body: { studioIds: selectedStudio },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Studio"
      description={`Remove ${selectedStudio.length} selected studios?`}
      deleteFunction={deleteStudio.mutate}
      closeModal={() => router.replace(pathname)}
    />
  )
}

import { useParams, usePathname, useRouter } from "next/navigation"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export function DeleteCinemasModal({
  selectedCinemas,
}: {
  selectedCinemas: number[]
}) {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const sideEffects = useSideEffects({
    text: "Deleting cinemas",
    queryKeys: regionQueryKeys.regionDetails(params.regionId),
  })
  const deleteCinemaMutation = mutation({
    url: "/api/cinemas/delete",
    method: "POST",
    body: {
      cinemaIds: selectedCinemas,
    },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Regions"
      description={`Remove ${selectedCinemas.length} selected cinemas ?`}
      closeModal={() => router.replace(pathname)}
      deleteFunction={deleteCinemaMutation.mutate}
    />
  )
}

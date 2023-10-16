import { usePathname, useRouter } from "next/navigation"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const DeleteRegionsModal = ({
  selectedRegions,
}: {
  selectedRegions: number[]
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const sideEffects = useSideEffects({
    text: "Deleting Region",
    queryKeys: regionQueryKeys.allRegion,
  })

  const deleteRegion = mutation({
    url: "/api/regions/delete",
    method: "POST",
    body: {
      regionIds: selectedRegions,
    },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Region"
      description="Continue delete region?"
      closeModal={() => router.replace(pathname)}
      deleteFunction={deleteRegion.mutate}
    />
  )
}

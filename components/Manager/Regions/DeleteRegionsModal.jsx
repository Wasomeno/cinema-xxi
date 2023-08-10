import { DeleteDataModal } from "@/components/DeleteDataModal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const DeleteRegionsModal = ({ closeModal, selectedRegions }) => {
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
      closeModal={closeModal}
      deleteFunction={deleteRegion.mutate}
    />
  )
}

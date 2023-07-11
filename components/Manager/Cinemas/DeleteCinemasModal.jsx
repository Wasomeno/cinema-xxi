import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";

export const DeleteCinemasModal = ({
  regionId,
  closeModal,
  selectedCinemas,
}) => {
  const sideEffects = useSideEffects({
    text: "Deleting cinemas",
    queryKeys: regionQueryKeys.regionDetails(regionId),
  });
  const deleteCinemaMutation = mutation({
    url: "/api/cinemas",
    method: "DELETE",
    body: {
      cinemaIds: selectedCinemas.map((cinema) => ({ id: cinema.id })),
    },
    sideEffects,
  });

  return (
    <DeleteDataModal
      title="Delete Regions"
      description={`Remove ${selectedCinemas.length} selected cinemas ?`}
      closeModal={closeModal}
      deleteFunction={deleteCinemaMutation.mutate}
    />
  );
};

import { useSession } from "next-auth/react";

import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys";

export const DeleteStudioModal = ({ closeModal, selectedStudio }) => {
  const { data: sessionData } = useSession();
  const sideEffects = useSideEffects({
    text: "Deleting studio",
    queryKeys: cinemaStudioQueryKeys.allStudio,
  });

  const deleteStudio = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/studios/delete`,
    method: "POST",
    body: { studioIds: selectedStudio.map((studio) => ({ id: studio.id })) },
    sideEffects,
  });

  return (
    <DeleteDataModal
      title="Delete Studio"
      description={`Remove ${selectedStudio.length} selected studios?`}
      deleteFunction={deleteStudio.mutate}
      closeModal={closeModal}
    />
  );
};

import { useSession } from "next-auth/react";

import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const DeleteCinemaAdminsModal = ({ closeModal, selectedAdmins }) => {
  const session = useSession();
  const sideEffects = useSideEffects({
    text: "Deleting cinema admins",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinemaId),
  });
  const deleteCineaAdmins = mutation({
    url: `/api/cinemas/${session.data.user.cinemaId}/admins/delete`,
    method: "POST",
    body: {
      adminIds: selectedAdmins.map((admin) => admin.id),
    },
    sideEffects,
  });
  return (
    <DeleteDataModal
      title="Delete Cinema Admins"
      description={`Continue delete ${selectedAdmins.length} selected admins ?`}
      closeModal={closeModal}
      deleteFunction={deleteCineaAdmins.mutate}
    />
  );
};

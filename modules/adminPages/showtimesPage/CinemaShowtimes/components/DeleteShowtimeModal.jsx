import { useSession } from "next-auth/react";

import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const DeleteShowtimeModal = ({ closeModal, selectedShowtimes }) => {
  const { data: sessionData } = useSession();

  const sideEffects = useSideEffects({
    text: "Deleting showtimes",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinemaId),
  });

  const deleteShowtimes = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/showtimes/delete`,
    method: "POST",
    body: {
      showtimeIds: selectedShowtimes.map((showtime) => ({ id: showtime.id })),
    },
    sideEffects: sideEffects,
  });

  return (
    <DeleteDataModal
      title="Delete Showtimes"
      description={`Remove ${selectedShowtimes.length} selected showtimes?`}
      closeModal={closeModal}
      deleteFunction={deleteShowtimes.mutate}
    />
  );
};

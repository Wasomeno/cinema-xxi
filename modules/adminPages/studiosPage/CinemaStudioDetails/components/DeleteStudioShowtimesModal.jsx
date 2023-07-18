import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";

export const DeleteStudioShowtimesModal = ({
  closeModal,
  selectedShowtimes,
}) => {
  const session = useSession();
  const router = useRouter();

  const sideEffects = useSideEffects({
    text: "Deleting studio showtimes",
    queryKeys: ["studioShowtimes", router.query.studioId],
  });
  const deleteStudioShowtimes = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/studios/${router.query.studioId}/showtimes/delete`,
    method: "POST",
    body: { showtimeIds: selectedShowtimes.map((showtime) => showtime.id) },
    sideEffects,
  });

  return (
    <DeleteDataModal
      title="Delete Studio Showtimes"
      description="Continue delete studio showtimes ?"
      deleteFunction={deleteStudioShowtimes.mutate}
      closeModal={closeModal}
    />
  );
};

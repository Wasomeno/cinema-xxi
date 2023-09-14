import { useSession } from "next-auth/react";

import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const DeleteCinemaMovieModal = ({ closeModal, selectedMovies }) => {
  const session = useSession();

  const sideEffects = useSideEffects({
    text: "Deleting Movies",
    queryKeys: cinemaQueryKeys.cinemaMovies(session.data?.user.cinemaId),
  });

  const deleteCinemaMovies = mutation({
    url: `/api/cinemas/ ${session.data?.user.cinemaId}/movies/delete`,
    method: "POST",
    body: {
      movieIds: selectedMovies.map((movie) => ({ id: movie.id })),
    },
    sideEffects,
  });

  return (
    <DeleteDataModal
      title="Delete Cinema Movie"
      description={`Remove ${selectedMovies.length} selected movies?`}
      closeModal={closeModal}
      deleteFunction={deleteCinemaMovies.mutate}
    />
  );
};

import { DeleteDataModal } from "@/components/DeleteDataModal";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { movieQueryKeys } from "@/components/reactQuery/queries/queryKeys/movieQueryKeys";

export const DeleteMoviesModal = ({ closeModal, selectedMovies }) => {
  const sideEffects = useSideEffects({
    text: "Deleting Movies",
    queryKeys: movieQueryKeys.allMovies,
  });

  const deleteMovies = mutation({
    url: "/api/movies/delete",
    method: "POST",
    body: {
      movieIds: selectedMovies.map((movie) => ({
        id: movie.id,
      })),
    },
    sideEffects,
  });
  return (
    <DeleteDataModal
      title="Delete Movies"
      description={`Continue delete ${selectedMovies.length} selected movies?`}
      closeModal={closeModal}
      deleteFunction={deleteMovies.mutate}
    />
  );
};

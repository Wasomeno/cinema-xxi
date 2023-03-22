import { movieQueryKeys } from "../../queries/queryKeys/movieQueryKeys";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteMovies = ({ movieIds }) => {
  const sideEffects = createSideEffects({
    context: "delete",
    object: "movies",
    invalidateQueries: true,
    queryKeys: movieQueryKeys.allMovies,
  });
  const deleteMoviesMutation = mutation({
    url: "/api/movies",
    method: "DELETE",
    body: {
      movieIds: movieIds,
    },
    sideEffects: sideEffects,
  });

  return deleteMoviesMutation;
};

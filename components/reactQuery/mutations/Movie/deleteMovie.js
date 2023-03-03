import { movieKeys } from "../../queries/Movie/movieQueryKeysFactory";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteMovies = ({ movieIds }) => {
  const sideEffects = createSideEffects({
    context: "delete",
    object: "movies",
    invalidateQueries: true,
    queryKeys: movieKeys.allMovies,
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

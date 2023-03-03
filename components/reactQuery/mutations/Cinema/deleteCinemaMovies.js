import { cinemaKeys } from "../../queries/Cinema/cinemaQueryKeysFactory";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteCinemaMovies = ({ cinemaId, movieIds }) => {
  const movieIdsArrayObject = movieIds.map((movieId) => ({
    id: movieId,
  }));
  const sideEffects = createSideEffects({
    context: "delete",
    object: "movie",
    invalidateQueries: true,
    queryKeys: cinemaKeys.cinemaMovies(cinemaId),
  });

  const deleteCinemaMoviesMutation = mutation({
    url: "/api/cinemas/" + cinemaId + "/movies",
    method: "DELETE",
    body: {
      movieIds: movieIdsArrayObject,
    },
    sideEffects: sideEffects,
  });

  return deleteCinemaMoviesMutation;
};

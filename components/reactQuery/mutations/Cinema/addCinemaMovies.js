import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export function useAddCinemaMovies({ movies }) {
  const adminDetails = useAdminDetailsContext();
  const sideEffects = createSideEffects({
    context: "add",
    object: "movies",
    redirect: true,
    redirectUrl: "/admin/movies",
  });
  const movieIds = movies.map((movie) => ({ id: movie.id }));
  const addCinemaMoviesMutation = mutation({
    url: "/api/cinemas/" + adminDetails?.cinema + "/movies",
    body: {
      movieIds: movieIds,
    },
    method: "POST",
    sideEffects,
  });
  return addCinemaMoviesMutation;
}

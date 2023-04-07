import { useSession } from "next-auth/react";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export function useAddCinemaMovies({ movies }) {
  const { data: sessionData } = useSession();
  const sideEffects = createSideEffects({
    context: "add",
    object: "movies",
    redirect: true,
    redirectUrl: "/admin/movies",
  });
  const movieIds = movies.map((movie) => ({ id: movie.id }));
  const addCinemaMoviesMutation = mutation({
    url: "/api/cinemas/" + sessionData.cinema + "/movies",
    body: {
      movieIds: movieIds,
    },
    method: "POST",
    sideEffects,
  });
  return addCinemaMoviesMutation;
}

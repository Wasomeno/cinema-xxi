import { query } from "../query";
import { movieQueryKeys } from "../queryKeys/movieQueryKeys";

export const useAllMovies = () => {
  const movies = query({
    queryKey: movieQueryKeys.allMovies,
    url: "/api/movies",
  });
  return movies;
};

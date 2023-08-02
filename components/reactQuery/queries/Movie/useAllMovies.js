import { query } from "../query";
import { movieQueryKeys } from "../queryKeys/movieQueryKeys";

export const useAllMovies = () => {
  return query({
    queryKey: movieQueryKeys.allMovies,
    url: "/api/movies",
  });
};

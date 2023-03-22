import { query } from "../query";
import { movieQueryKeys } from "../queryKeys/movieQueryKeys";

export const useMovieDetails = ({ movieId }) => {
  const movieDetails = query({
    queryKey: movieQueryKeys.movieDetails(movieId),
    url: "/api/movies/" + movieId,
  });

  return movieDetails;
};

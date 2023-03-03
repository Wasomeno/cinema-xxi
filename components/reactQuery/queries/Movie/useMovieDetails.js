import { query } from "../../query";
import { movieKeys } from "./movieQueryKeysFactory";

export const useMovieDetails = ({ movieId }) => {
  const movieDetails = query({
    queryKey: movieKeys.movieDetails(movieId),
    url: "/api/movies/" + movieId,
  });

  return movieDetails;
};

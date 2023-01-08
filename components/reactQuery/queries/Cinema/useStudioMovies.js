import { cinemaContract, moviesContract } from "hooks/useContract";
import { query } from "../../query";

export const useStudioMovies = ({ region, cinema, studio }) => {
  const contractCinema = cinemaContract({ read: true });
  const contractMovie = moviesContract({ read: true });
  const moviesInStudio = query({
    queryKey: ["studioMovies", region, cinema, studio],
    queryFunction: async () => {
      const movieIds = await contractCinema.getMoviesInStudio(
        region,
        cinema,
        studio
      );
      const movies = Promise.all(
        movieIds.map(
          async (movieId) => await contractMovie.getMovieDetails(movieId)
        )
      );
      return movies;
    },
  });
  return moviesInStudio;
};

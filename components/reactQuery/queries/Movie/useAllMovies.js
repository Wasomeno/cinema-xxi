import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllMovies = () => {
  const contract = moviesContract({ read: true });
  const movies = query({
    queryKey: ["allMovies"],
    queryFunction: async () => {
      const movieIds = await contract.getMovies();
      return await Promise.all(
        movieIds.map(async (movie) => {
          const { title, duration } = await contract.getMovieDetails(movie);
          return { movieId: movie, title: title, duration: duration };
        })
      );
    },
  });
  return movies;
};

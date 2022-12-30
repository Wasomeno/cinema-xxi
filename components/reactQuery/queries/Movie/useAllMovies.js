import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllMovies = async () => {
  const contract = moviesContract({ read: true });
  const movieIds = await contract.getMovies();
  const movies = await Promise.all(
    movieIds.map(async (movie) => {
      const { title, duration } = await contract.getMovieDetails(movie);
      return { movieId: movie, title: title, duration: duration };
    })
  );
  return JSON.parse(JSON.stringify(movies));
};

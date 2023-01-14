import { parseBytes32String } from "ethers/lib/utils.js";
import { cinemaContract, moviesContract } from "hooks/useContract";
import { query } from "../../query";

export const useRegionMovies = ({ region }) => {
  const contractCinema = cinemaContract({ read: true });
  const contractMovie = moviesContract({ read: true });

  const regionMovies = query({
    queryKey: ["regionMovies", region],
    queryFunction: async () => {
      const movies = await contractCinema.getMoviesInRegion(region);
      const moviesInRegion = movies.flat();
      const moviesInRegionDetails = Promise.all(
        moviesInRegion.map(async (movie) => {
          const movieDetails = await contractMovie.getMovieDetails(movie);
          return { id: movie, title: parseBytes32String(movieDetails.title) };
        })
      );
      return moviesInRegionDetails;
    },
  });
  return regionMovies;
};

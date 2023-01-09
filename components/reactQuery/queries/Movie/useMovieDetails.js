import { parseBytes32String } from "ethers/lib/utils.js";
import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useMovieDetails = ({ movieId }) => {
  const contract = moviesContract({ read: true });
  const movieDetails = query({
    queryKey: ["movieDetails", movieId],
    queryFunction: async () => {
      const { title, duration } = await contract.movieToDetails(movieId);
      return {
        title: parseBytes32String(title),
        duration: parseInt(duration),
      };
    },
  });
  return movieDetails;
};

import { ethers } from "ethers";
import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useMovieDetails = async ({ movieId }) => {
  const contract = moviesContract({ read: true });
  const { title, duration } = await contract.movieToDetails(movieId);
  return JSON.parse(
    JSON.stringify({
      title: ethers.utils.parseBytes32String(title),
      duration: parseInt(duration),
    })
  );
};

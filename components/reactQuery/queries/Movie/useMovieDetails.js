import { parseBytes32String } from "ethers/lib/utils.js";
import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useMovieDetails = ({ movieId }) => {
  return { data: { title: "Movie 1" }, isLoading: false };
};

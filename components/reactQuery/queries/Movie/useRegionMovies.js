import { parseBytes32String } from "ethers/lib/utils.js";
import { cinemaContract, moviesContract } from "hooks/useContract";
import { query } from "../../query";

export const useRegionMovies = ({ region }) => {
  return {
    data: [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
      { id: 3, title: "Movie 3" },
      { id: 4, title: "Movie 4" },
    ],
  };
};

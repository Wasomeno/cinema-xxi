import { parseBytes32String } from "ethers/lib/utils.js";
import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllMovies = () => {
  return {
    data: [
      {
        title: "Movie 1",
      },
      {
        title: "Movie 2",
      },
      {
        title: "Movie 3",
      },
      {
        title: "Movie 4",
      },
      {
        title: "Movie 5",
      },
    ],
  };
};

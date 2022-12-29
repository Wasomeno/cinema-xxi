import { moviesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useAllMovies = async () => {
  const contract = moviesContract({ read: true });
  const result = await contract.getMovies();
  return result;
};

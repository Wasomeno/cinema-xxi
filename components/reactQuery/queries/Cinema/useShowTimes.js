import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useShowTimes = ({ region, cinema }) => {
  const contract = cinemaContract();
  const result = query(
    ["cinemaShowTimes", region, cinema],
    contract.getCinemaShowTimes(region, cinema)
  );
  return result;
};

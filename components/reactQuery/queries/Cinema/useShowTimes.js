import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useShowTimes = async ({ region, cinema }) => {
  const contract = cinemaContract({ read: true });
  const result = await contract.getCinemaShowTimes(region, cinema);
  return result;
};

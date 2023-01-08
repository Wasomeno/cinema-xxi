import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useCinemaShowTimes = ({ region, cinema }) => {
  const contract = cinemaContract({ read: true });
  const result = query({
    queryKey: ["cinemaShowtimes", region, cinema],
    queryFunction: async () =>
      await contract.getCinemaShowTimes(region, cinema),
  });
  return result;
};

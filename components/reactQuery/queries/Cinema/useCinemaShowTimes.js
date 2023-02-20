import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useCinemaShowTimes = ({ region, cinema }) => {
  return { data: [5000, 3000, 2000], isLoading: false };
};

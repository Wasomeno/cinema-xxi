import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useCinemaDetails = async ({ region, cinema }) => {
  const contract = cinemaContract({ read: true });
  return await contract.getCinemaDetails(region, cinema);
};

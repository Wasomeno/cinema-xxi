import { ethers } from "ethers";
import { cinemaContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useCinemaDetails = async ({ region, cinema }) => {
  const contract = cinemaContract({ read: true });
  const cinemaDetails = await contract.getCinemaDetails(region, cinema);
  return JSON.parse(
    JSON.stringify({
      name: ethers.utils.parseBytes32String(cinemaDetails.name),
      studiosAmount: cinemaDetails.studiosAmount,
      moviesAmount: cinemaDetails.moviesAmount,
      showTimesAmount: cinemaDetails.showTimesAmount,
      showTimes: cinemaDetails.showTimes,
      studioShowTimes: cinemaDetails.studioShowTimes,
      studioCapacities: cinemaDetails.studiosCapacities,
    })
  );
};

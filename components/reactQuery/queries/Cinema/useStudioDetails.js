import { cinemaContract } from "hooks/useContract";
import { query } from "../../query";

export const useStudioDetails = (region, cinema, studio) => {
  const contract = cinemaContract({ read: true });
  const studioDetails = query({
    queryKey: ["studioDetails", region, cinema, studio],
    queryFunction: async () => {
      const studioShowTimes = await contract.getStudioShowTimes(
        region,
        cinema,
        studio
      );
      const studioCapacity = await contract.getStudioCapacity(
        region,
        cinema,
        studio
      );
      const studioMovies = await contract.getMoviesInStudio(
        region,
        cinema,
        studio
      );

      return {
        showTimes: studioShowTimes,
        capacity: studioCapacity,
        movies: studioMovies,
      };
    },
  });

  return studioDetails;
};

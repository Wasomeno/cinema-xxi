import { cinemaContract } from "hooks/useContract";
import { query } from "../../query";

export const useStudioDetails = ({ region, cinema, studio }) => {
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

export const useStudioCapacity = ({ region, cinema, studio }) => {
  const contract = cinemaContract({ read: true });
  const studioCapacity = query({
    queryKey: ["studioCapacity", region, cinema, studio],
    queryFunction: () => {
      const capacity = contract
        .getStudioCapacity(region, cinema, studio)
        .then((result) => {
          let studioArray = [];
          for (let i = 1; i <= result; ++i) {
            studioArray.push(i);
          }
          return studioArray;
        });
      return capacity;
    },
  });
  return studioCapacity;
};

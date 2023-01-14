import { parseBytes32String } from "ethers/lib/utils.js";
import { cinemaContract, regionContract } from "hooks/useContract";
import { query } from "../../query";

const getMovieStudioShowtimes = async (region, cinema, movie) => {
  let studiosShowtimes = [];
  const contract = cinemaContract({ read: true });
  const { studiosAmount } = await contract.cinemaToDetails(region, cinema);
  for (let i = 0; i < studiosAmount; i++) {
    const studioShowtimes = await contract.getMovieShowTimesInStudio(
      region,
      cinema,
      movie,
      i + 1
    );
    if (studioShowtimes.length > 0) {
      studiosShowtimes.push({ studio: i + 1, showtimes: studioShowtimes });
    }
  }
  return studiosShowtimes;
};

export const useRegionMovieShowtimes = ({ region, movie }) => {
  const contractRegion = regionContract({ read: true });
  const cinemaMovieShowtimes = query({
    queryKey: ["cinemaMovieShowtimes", region, movie],
    queryFunction: async () => {
      const cinemaInRegion = await contractRegion.getCinemasInRegion(region);
      const cinemaShowtimes = await Promise.all(
        cinemaInRegion.map(
          async (cinema) => await getMovieStudioShowtimes(region, cinema, movie)
        )
      );
      return {
        cinemaInRegion: cinemaInRegion,
        cinemaShowtimes: cinemaShowtimes,
      };
    },
  });
  return cinemaMovieShowtimes;
};

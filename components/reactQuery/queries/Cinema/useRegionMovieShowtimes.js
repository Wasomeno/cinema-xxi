import { query } from "../query";

export const useRegionMovieShowtimes = ({ regionId, movieId }) => {
  const movieShowtimes = query({
    queryKey: ["regionMovieShowtimes", regionId, movieId],
    url: "/api/regions/" + regionId + "/movies/" + movieId,
  });

  return movieShowtimes;
};

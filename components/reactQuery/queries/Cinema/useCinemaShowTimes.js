import { query } from "../query";
import { cinemaQueryKeys } from "../queryKeys/cinemaQueryKeys";

export const useCinemaShowTimes = (cinema) => {
  const cinemaShowtimes = query({
    queryKey: cinemaQueryKeys.cinemaShowtimes(cinema),
    url: "/api/cinemas/" + cinema + "/showtimes",
  });
  return cinemaShowtimes;
};

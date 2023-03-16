import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export const useCinemaShowTimes = (cinema) => {
  const cinemaShowtimes = query({
    queryKey: cinemaKeys.cinemaShowtimes(cinema),
    url: "/api/cinemas/" + cinema + "/showtimes",
  });
  return cinemaShowtimes;
};

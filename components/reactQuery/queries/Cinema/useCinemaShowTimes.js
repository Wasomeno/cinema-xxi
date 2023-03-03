import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export const useCinemaShowTimes = () => {
  const adminDetails = useAdminDetailsContext();
  const cinemaShowtimes = query({
    queryKey: cinemaKeys.cinemaShowtimes(adminDetails?.cinema),
    url: "/api/cinemas/" + adminDetails?.cinema + "/showtimes",
  });
  return cinemaShowtimes;
};

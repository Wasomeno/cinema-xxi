import { useAdminDetailsContext } from "context/AppContext";

import { query } from "../../query";
import { cinemaStudioKeys } from "./cinemaStudioQueryKeysFactory";

export const useStudioShowTimes = ({ studio }) => {
  const adminDetails = useAdminDetailsContext();
  const studioShowtimes = query({
    queryKey: cinemaStudioKeys.studioShowtimes(studio, adminDetails?.cinema),
    url:
      "/api/cinemas/" +
      adminDetails?.cinema +
      "/studios/" +
      studio +
      "/showtimes",
  });

  return studioShowtimes;
};

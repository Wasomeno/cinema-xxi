import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";

import { query } from "../query";
import { cinemaStudioQueryKeys } from "../queryKeys/cinemaStudioQueryKeys";

export const useStudioShowTimes = ({ studio }) => {
  const adminDetails = useAdminDetailsContext();
  const studioShowtimes = query({
    queryKey: cinemaStudioQueryKeys.studioShowtimes(
      studio,
      adminDetails?.cinema
    ),
    url:
      "/api/cinemas/" +
      adminDetails?.cinema +
      "/studios/" +
      studio +
      "/showtimes",
  });

  return studioShowtimes;
};

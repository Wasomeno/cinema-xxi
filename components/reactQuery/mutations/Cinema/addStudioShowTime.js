import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addStudioShowtimes = ({ studioId, showtimes }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const adminDetails = useAdminDetailsContext();

  const showtimeIds = showtimes.map((showtime) => ({
    id: showtime.id,
  }));

  const sideEffects = createSideEffects({
    context: "add",
    object: "showtimes",
    redirect: true,
    redirectUrl: "/admin/studios",
  });

  const addStudioShowtimesMutation = mutation({
    url:
      "/api/cinemas/" +
      adminDetails?.cinema +
      "/studios/" +
      studioId +
      "/showtimes",
    method: "POST",
    body: {
      cinemaId: adminDetails?.cinema,
      studioId: studioId,
      showtimeIds: showtimeIds,
    },
    sideEffects: sideEffects,
  });

  return addStudioShowtimesMutation;
};

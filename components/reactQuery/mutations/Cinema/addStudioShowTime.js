import { useSession } from "next-auth/react";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addStudioShowtimes = ({ studioId, showtimes }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: sessionData } = useSession();

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
      sessionData.cinemaId +
      "/studios/" +
      studioId +
      "/showtimes",
    method: "POST",
    body: {
      cinemaId: sessionData.cinemaId,
      studioId: studioId,
      showtimeIds: showtimeIds,
    },
    sideEffects: sideEffects,
  });

  return addStudioShowtimesMutation;
};

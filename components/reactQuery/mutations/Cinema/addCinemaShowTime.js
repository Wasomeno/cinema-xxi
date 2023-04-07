import { useSession } from "next-auth/react";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const useAddCinemaShowtime = ({ hour, minutes }) => {
  const showtime = hour * 3600 + minutes * 60;
  const { data: sessionData } = useSession();
  const sideEffects = createSideEffects({
    context: "add",
    object: "showtime",
    redirect: true,
    redirectUrl: "/admin/showtimes",
  });
  const addCinemaShowtimeMutation = mutation({
    url: "/api/cinemas/" + sessionData.cinemaId + "/showtimes",
    method: "POST",
    body: {
      showtime: showtime,
    },
    sideEffects: sideEffects,
  });

  return addCinemaShowtimeMutation;
};

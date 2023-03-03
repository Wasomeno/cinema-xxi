import { useAdminDetailsContext } from "context/AppContext";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const useAddCinemaShowtime = ({ hour, minutes }) => {
  const showtime = hour * 3600 + minutes * 60;
  const adminDetails = useAdminDetailsContext();
  const sideEffects = createSideEffects({
    context: "add",
    object: "showtime",
    redirect: true,
    redirectUrl: "/admin/showtimes",
  });
  const addCinemaShowtimeMutation = mutation({
    url: "/api/cinemas/" + adminDetails.cinema + "/showtimes",
    method: "POST",
    body: {
      showtime: showtime,
    },
    sideEffects: sideEffects,
  });

  return addCinemaShowtimeMutation;
};

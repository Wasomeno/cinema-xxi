import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addStudioMoviesShowtime = ({ studioId, showtime, movie }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const adminDetails = useAdminDetailsContext();
  const sideEfffects = createSideEffects({
    context: "add",
    object: "movies",
    redirect: true,
    redirectUrl: "/admin/studios",
  });

  const addStudioMoviesShowtimeMutation = mutation({
    url:
      "/api/cinemas/" +
      adminDetails?.cinema +
      "/studios/" +
      studioId +
      "/movies",
    method: "POST",
    body: {
      showtimeId: showtime?.id,
      movieId: movie?.id,
      studioId: studioId,
    },
    sideEffects: sideEfffects,
  });
  return addStudioMoviesShowtimeMutation;
};

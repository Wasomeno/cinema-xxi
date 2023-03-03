import { cinemaKeys } from "../../queries/Cinema/cinemaQueryKeysFactory";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteShowtimes = ({ cinemaId, showtimes }) => {
  const sideEffects = createSideEffects({
    context: "delete",
    object: "showtimes",
    invalidateQueries: true,
    queryKeys: cinemaKeys.cinemaShowtimes(cinemaId),
  });

  const deleteShowtimesMutation = mutation({
    url: "/api/cinemas/" + cinemaId + "/showtimes",
    method: "DELETE",
    body: {
      showtimes: showtimes,
    },
    sideEffects: sideEffects,
  });

  return deleteShowtimesMutation;
};

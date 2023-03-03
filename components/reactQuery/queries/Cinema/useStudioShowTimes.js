import { query } from "../../query";
import { cinemaStudioKeys } from "./cinemaStudioQueryKeysFactory";

export const useStudioShowTimes = ({ cinemaId, studio }) => {
  const studioShowtimes = query({
    queryKey: cinemaStudioKeys.studioShowtimes(studio, cinemaId),
    url: "/api/cinemas/" + cinemaId + "/studios/" + studio + "/showtimes",
  });

  return studioShowtimes;
};

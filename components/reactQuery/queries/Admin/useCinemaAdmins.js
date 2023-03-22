import { query } from "../query";
import { cinemaQueryKeys } from "../queryKeys/cinemaQueryKeys";

export const useCinemaAdmins = (cinemaId) => {
  const cinemaAdmins = query({
    queryKey: cinemaQueryKeys.cinemaAdmins(cinemaId),
    url: "/api/cinemas/" + cinemaId + "/admins",
  });
  return cinemaAdmins;
};

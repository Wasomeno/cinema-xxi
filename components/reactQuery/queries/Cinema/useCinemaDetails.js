import { query } from "../query";
import { cinemaQueryKeys } from "../queryKeys/cinemaQueryKeys";

export const useCinemaDetails = (cinema) => {
  const cinemaDetails = query({
    queryKey: cinemaQueryKeys.cinemaDetails(cinema),
    url: "/api/cinemas/" + cinema,
  });

  return cinemaDetails;
};

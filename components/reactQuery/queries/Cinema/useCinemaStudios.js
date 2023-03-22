import { query } from "../query";
import { cinemaStudioQueryKeys } from "../queryKeys/cinemaStudioQueryKeys";

export const useCinemaStudios = (cinema) => {
  const cinemaStudios = query({
    queryKey: cinemaStudioQueryKeys.allStudio,
    url: "/api/cinemas/" + cinema + "/studios",
  });
  return cinemaStudios;
};

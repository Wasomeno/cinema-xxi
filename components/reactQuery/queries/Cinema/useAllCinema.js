import { query } from "../query";
import { cinemaQueryKeys } from "../queryKeys/cinemaQueryKeys";

export function useAllCinema() {
  const allCinema = query({
    queryKey: cinemaQueryKeys.allCinema,
    url: "/api/cinemas",
  });
  return allCinema;
}

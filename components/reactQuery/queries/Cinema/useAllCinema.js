import { query } from "../../query";
import { cinemaKeys } from "./cinemaQueryKeysFactory";

export function useAllCinema() {
  const allCinema = query({
    queryKey: cinemaKeys.allCinema,
    url: "/api/cinemas",
  });
  return allCinema;
}

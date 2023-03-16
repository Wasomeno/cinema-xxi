import { query } from "../../query";
import { cinemaKeys } from "../Cinema/cinemaQueryKeysFactory";

export const useCinemaAdmins = (cinemaId) => {
  const cinemaAdmins = query({
    queryKey: cinemaKeys.cinemaAdmins(cinemaId),
    url: "/api/cinemas/" + cinemaId + "/admins",
  });
  return cinemaAdmins;
};

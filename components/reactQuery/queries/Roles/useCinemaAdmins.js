import { rolesContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useCinemaAdmins = ({ regionId, cinemaId }) => {
  return { data: [0x000000000, 0x00000000, 0x000000], isLoading: false };
};

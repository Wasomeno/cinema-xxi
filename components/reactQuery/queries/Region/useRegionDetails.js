import { parseBytes32String } from "ethers/lib/utils.js";
import { regionContract } from "../../../../hooks/useContract";
import { query } from "../../query";

export const useRegionDetails = ({ region }) => {
  const contract = regionContract({ read: true });
  const result = query({
    queryKey: ["regionDetails", region],
    queryFunction: async () => {
      const { _cinemas, _cinemasAmount, _name } =
        await contract.getRegionsDetails(region);
      const parsedName = parseBytes32String(_name);
      const intCinemaAmount = parseInt(_cinemasAmount);
      const intCinemas = _cinemas.map((cinema) => parseInt(cinema));

      return {
        name: parsedName,
        cinemaAmount: intCinemaAmount,
        cinemas: intCinemas,
      };
    },
  });
  return result;
};

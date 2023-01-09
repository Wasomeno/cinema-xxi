import { parseBytes32String } from "ethers/lib/utils.js";
import { cinemaContract, rolesContract } from "../../../../hooks/useContract";
import { query } from "../../query";
import { useCinemaTransactions } from "./useCinemaTransactions";

export const useCinemaDetails = ({ region, cinema }) => {
  const contractCinema = cinemaContract({ read: true });
  const contractRoles = rolesContract({ read: true });
  const details = query({
    queryKey: ["cinemaDetails", region, cinema],
    queryFunction: async () => {
      const cinemaDetails = await contractCinema.getCinemaDetails(
        region,
        cinema
      );
      const cinemaAdmins = await contractRoles.getCinemaAdmins(region, cinema);
      const cinemaTransactions = await useCinemaTransactions({
        region: region,
        cinema: cinema,
      });

      return {
        name: parseBytes32String(cinemaDetails.name),
        studioAmount: parseInt(cinemaDetails.studiosAmount),
        moviesAmount: parseInt(cinemaDetails.moviesAmount),
        showTimesAmount: parseInt(cinemaDetails.showTimesAmount),
        studioCapacities: parseInt(cinemaDetails.studiosCapacities),
        transactionsAmount: parseInt(cinemaTransactions.transactionsAmount),
        // capacityTotal: capacityTotal,
        admins: cinemaAdmins,
      };
    },
  });
  return details;
};

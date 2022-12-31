import { ethers } from "ethers";
import { cinemaContract, rolesContract } from "../../../../hooks/useContract";
import { useCinemaTransactions } from "./useCinemaTransactions";

export const useCinemaDetails = async ({ region, cinema }) => {
  const contractCinema = cinemaContract({ read: true });
  const contractRoles = rolesContract({ read: true });
  const cinemaDetails = await contractCinema.getCinemaDetails(region, cinema);
  const cinemaAdmins = await contractRoles.getCinemaAdmins(region, cinema);
  const cinemaTransactions = await useCinemaTransactions({
    region: region,
    cinema: cinema,
  });

  return JSON.parse(
    JSON.stringify({
      name: ethers.utils.parseBytes32String(cinemaDetails.name),
      studiosAmount: cinemaDetails.studiosAmount,
      moviesAmount: cinemaDetails.moviesAmount,
      showTimesAmount: cinemaDetails.showTimesAmount,
      studioCapacities: cinemaDetails.studiosCapacities,
      transactionsAmount: cinemaTransactions.transactionsAmount,
      admins: cinemaAdmins,
    })
  );
};

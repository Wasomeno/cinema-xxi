import useMetamask from "hooks/useMetamask";
import { cinemaContract } from "../../../../hooks/useContract";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addShowTimesToStudio = ({ region, cinema, studio, showtimes }) => {
  const contract = cinemaContract({ read: false });
  const { mutate } = mutation(async () => {
    const provider = useMetamask();
    const addShowTimes = await contract.addStudioShowTimes(
      region,
      cinema,
      studio,
      showtimes
    );
    const waitTransaction = await provider.waitForTransaction(
      addShowTimes.hash
    );
    return waitTransaction;
  }, createSideEffects({ context: "add", object: "showtime" }));

  return mutate;
};

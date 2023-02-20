import { parseEther } from "ethers/lib/utils.js";
import { ticketContract } from "hooks/useContract";
import useMetamask from "hooks/useMetamask";

import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const mintTickets = ({
  region,
  cinema,
  studio,
  showtime,
  movie,
  seatNumbers,
  total,
}) => {
  const contract = ticketContract({ read: false });
  const { mutate } = mutation(async () => {
    const date = new Date(Date.now());
    const provider = useMetamask();
    const transaction = await contract.mintTickets(
      date.getDay(),
      region,
      cinema,
      studio,
      showtime,
      movie,
      seatNumbers,
      { value: parseEther(total.toString()) }
    );
    return await provider.waitForTransaction(transaction.hash);
  }, createSideEffects({ context: "minting", object: "tickets" }));

  return mutate;
};

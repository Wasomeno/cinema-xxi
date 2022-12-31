import { cinemaContract } from "../../../../hooks/useContract";
import useMetamask from "../../../../hooks/useMetamask";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const deleteCinema = ({ regionId, cinemaId }) => {
  const contract = cinemaContract({ read: false });

  const { mutate } = mutation(async () => {
    const provider = useMetamask();
    const transaction = await contract.deleteCinemas(regionId, [cinemaId]);
    return await provider.waitForTransaction(transaction.hash);
  }, createSideEffects({ context: "delete", object: "cinema" }));

  return mutate;
};

import { rolesContract } from "../../../../hooks/useContract";
import useMetamask from "../../../../hooks/useMetamask";
import { createSideEffects } from "../createSideEffects";
import mutation from "../mutation";

export const addCinemaAdmin = ({ regionId, cinemaId, adminAddress }) => {
  const contract = rolesContract({ read: false });
  const { mutate } = mutation(async (event) => {
    event.preventDefault();
    const provider = useMetamask();
    const transaction = await contract.addCinemaAdmins(regionId, cinemaId, [
      adminAddress,
    ]);
    return await provider.waitForTransaction(transaction.hash);
  }, createSideEffects({ context: "add", object: "cinema admin" }));

  return mutate;
};

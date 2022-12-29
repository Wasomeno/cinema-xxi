import { ethers } from "ethers";
import { cinemaContract } from "../../../../hooks/useContract";
import { useLoading, useToast } from "../../../../store/stores";
import useMetamask from "../../../../hooks/useMetamask";
import mutation from "../mutation";

const addCinemaSides = () => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();

  return {
    onMutate: () => {
      setLoadingText("Adding new cinema");
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      console.log(error);
      toastError(error.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Successfully added new cinema");
    },
  };
};

export const addCinema = ({
  regionId,
  cinemaId,
  cinemaName,
  studioAmount,
  studioCapacities,
}) => {
  const contract = cinemaContract({ read: false });

  const { mutate } = mutation(async (event) => {
    event.preventDefault();
    const provider = useMetamask();
    const cinemaNameBytes32 = ethers.utils.formatBytes32String(cinemaName);
    const cinemaStudioCapacities = studioCapacities.map((capacity) =>
      parseInt(capacity)
    );

    const transaction = await contract.addCinemas(
      regionId,
      [cinemaId],
      [cinemaNameBytes32],
      [studioAmount],
      [cinemaStudioCapacities]
    );
    const waitTransaction = await provider.waitForTransaction(transaction.hash);
    return waitTransaction;
  }, addCinemaSides());

  return mutate;
};

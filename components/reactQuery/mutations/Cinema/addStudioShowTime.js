import { ethers } from "ethers";
import { cinemaContract } from "../../../../hooks/useContract";
import { useLoading, useToast } from "../../../../store/stores";
import mutation from "../mutation";

const addStudioShowTimeSides = (selectedStudio) => {
  const [toastSuccess, toastError] = useToast();
  const [setLoading, setLoadingText] = useLoading();
  const sideEffects = {
    onMutate: () => {
      setLoadingText("Adding show times to studio " + selectedStudio);
      setLoading(true);
    },
    onError: (result) => {
      setLoading(false);
      toastError(result.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Successfully added show times to studio " + selectedStudio);
    },
  };

  return sideEffects;
};

export const addShowTimesToStudio = ({
  adminDetails,
  selectedStudio,
  selectedShowTimes,
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = cinemaContract();
  const { mutate } = mutation(async () => {
    const addShowTimes = await contract.addStudioShowTimes(
      adminDetails.region,
      adminDetails.cinema,
      selectedStudio,
      selectedShowTimes
    );
    const waitTransaction = await provider.waitForTransaction(
      addShowTimes.hash
    );
    return waitTransaction;
  }, addStudioShowTimeSides());

  return mutate;
};

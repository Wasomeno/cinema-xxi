import { ethers } from "ethers";
import { cinemaContract } from "../../../../hooks/useContract";
import { useLoading, useToast } from "../../../../store/stores";
import { invalidateQueries } from "../../query";
import mutation from "../mutation";

const addCinemaShowTimeSides = () => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  const sideEffects = {
    onMutate: () => {
      setLoadingText("Adding new show time");
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      toastError(error.reason);
    },
    onSuccess: () => {
      setLoading(false);
      invalidateQueries(["cinemaShowTimes"]);
      toastSuccess("Show time successfully added");
    },
  };

  return sideEffects;
};

export const addCinemaShowTime = ({ adminDetails, hour, minutes }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = cinemaContract();
  const timeInSeconds = hour * 3600 + minutes * 60;
  const { mutate } = mutation(async () => {
    const addShowTime = await contract.addShowTime(
      adminDetails.region,
      adminDetails.cinema,
      timeInSeconds
    );
    const waitTransaction = await provider.waitForTransaction(addShowTime.hash);
    return waitTransaction;
  }, addCinemaShowTimeSides());

  return mutate;
};

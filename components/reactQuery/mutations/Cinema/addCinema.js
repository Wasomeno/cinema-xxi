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
}) => {};

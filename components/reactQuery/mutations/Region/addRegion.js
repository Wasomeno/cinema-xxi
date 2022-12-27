import { ethers } from "ethers";
import { regionContract } from "../../../../hooks/useContract";
import { useLoading, useToast } from "../../../../store/stores";
import mutation from "../mutation";

const addRegionSideEffects = (region) => {
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => {
      setLoadingText("Adding new region");
      setLoading(true);
    },
    onError: (result) => {
      setLoading(false);
      toastError(result.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Region " + region + " successfully added");
    },
  };
};

export const addRegion = ({ regionId, regionName }) => {
  const contract = regionContract({ read: false });
  const { mutate } = mutation(async () => {
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const regionNameBytes32 = ethers.utils.formatBytes32String(regionName);
    const transaction = await contract.addRegion(regionId, regionNameBytes32);
    const waitTransaction = await provider.waitForTransaction(transaction.hash);
    return waitTransaction;
  }, addRegionSideEffects(regionName));

  return mutate;
};

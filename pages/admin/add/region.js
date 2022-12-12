import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useRef } from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import { cinemaContract } from "../../../hooks/useContract";
import { useSetLoading, useToast } from "../../../store/stores";

const region = () => {
  const regionIdRef = useRef();
  const regionNameRef = useRef();
  const [setLoading, setLoadingText] = useSetLoading();
  const [toastSuccess, toastError] = useToast();

  const addRegionMutation = useMutation((event) => submit(event), {
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
      toastSuccess(
        "Region " + regionNameRef.current.value + " successfully added"
      );
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = cinemaContract();
    const regionId = regionIdRef.current.value;
    const regionName = ethers.utils.formatBytes32String(
      regionNameRef.current.value
    );
    const addRegion = await contract.addRegion(regionId, regionName);
    const waitTransaction = await provider.waitForTransaction(addRegion.hash);
    return waitTransaction;
  };

  return (
    <AnimatedContainer className="flex flex-col justify-center items-center w-full">
      <div className="w-4/6">
        <h1 className="font-poppins text-2xl font-semibold m-2 text-center">
          Add Region
        </h1>
      </div>
      <form
        onSubmit={(event) => addRegionMutation.mutate(event)}
        className="w-4/6 flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">Region ID</h5>
          <input
            ref={regionIdRef}
            type="text"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">Region Name</h5>
          <input
            ref={regionNameRef}
            type="text"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center"
          />
        </div>
        <div className="w-full text-center my-4">
          <input
            type="submit"
            value={"Add Region"}
            className="w-3/12 rounded-lg font-poppins font-medium bg-black text-white p-2"
          />
        </div>
      </form>
    </AnimatedContainer>
  );
};

export default region;

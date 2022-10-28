import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useRef } from "react";
import { cinemaContract } from "../../../hooks/useContract";

const region = () => {
  const regionIdRef = useRef();
  const regionNameRef = useRef();
  const cinemaAmountRef = useRef();
  const addRegionMutation = useMutation((event) => submit(event));

  const submit = async (event) => {
    event.preventDefault();
    const contract = cinemaContract();
    const regionId = regionIdRef.current.value;
    const regionName = ethers.utils.formatBytes32String(
      regionNameRef.current.value
    );
    const cinemaAmount = cinemaAmountRef.current.value;
    const addRegion = await contract.addRegionDetails(
      regionId,
      regionName,
      cinemaAmount
    );
    return addRegion;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
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
        <div className="w-full flex flex-col justify-center items-center m-2 mb-4">
          <h5 className="font-poppins font-medium text-lg m-2">
            Cinemas Amount
          </h5>
          <input
            ref={cinemaAmountRef}
            type="number"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center"
          />
        </div>
        <div className="w-full text-center">
          <input
            type="submit"
            value={"Add Region"}
            className="w-3/12 rounded-lg font-poppins font-medium bg-black text-white p-2"
          />
        </div>
      </form>
    </div>
  );
};

export default region;

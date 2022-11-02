import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../../../context/AppContext";
import { checkConnected, fetchRegions } from "../../../fetchers/fetchers";
import { cinemaContract } from "../../../hooks/useContract";
import { useSetLoading, useToast } from "../../../store/stores";

const cinemas = () => {
  const [studioAmount, setStudioAmount] = useState(1);
  const [studioCapacities, setStudioCapacities] = useState([""]);
  const [setLoading, setLoadingText] = useSetLoading();
  const [toastSuccess, toastError] = useToast();
  const cinemaNameRef = useRef();
  const adminDetails = useContext(appContext).adminDetails;
  const addCinemaMutation = useMutation((event) => submit(event), {
    onMutate: () => {
      setLoadingText("Adding new cinema");
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      toastError(error.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Successfully added new cinema");
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = cinemaContract();
    const region = userDetails.data.region;
    const cinemaName = ethers.utils.formatBytes32String(
      cinemaNameRef.current.value
    );
    const addCinema = await contract.addCinema(
      region,
      cinemaName,
      studioAmount,
      studioCapacities
    );
    const waitTransaction = await provider.waitForTransaction(addCinema.hash);
    return waitTransaction;
  };

  const decrementStudioAmount = () => {
    if (studioAmount <= 1) return;
    setStudioAmount((currentAmount) => currentAmount - 1);
    setStudioCapacities((currentAmount) =>
      currentAmount.filter((studio, index) => {
        return index !== studioAmount - 1;
      })
    );
  };

  const incrementStudioAmount = () => {
    if (studioAmount >= 10) return;
    setStudioAmount((currentAmount) => currentAmount + 1);
    setStudioCapacities((currentAmount) => [...currentAmount, ""]);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-4/6 text-center m-4 p-2">
        <h1 className="font-poppins font-semibold text-3xl">Add Cinema</h1>
      </div>
      <form
        onSubmit={(event) => addCinemaMutation.mutate(event)}
        className="w-4/6 flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">
            Region {adminDetails.region}
          </h5>
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">Cinema Name</h5>
          <input
            ref={cinemaNameRef}
            type="text"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">
            Studio Amount
          </h5>
          <div className="flex w-full justify-center items-center">
            <button
              type="button"
              className="p-2 bg-black rounded-lg"
              onClick={decrementStudioAmount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <input
              type="text"
              value={studioAmount}
              readOnly={true}
              className="w-2/12 h-8 mx-2 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center"
            />
            <button
              type="button"
              className="p-2 bg-black rounded-lg"
              onClick={incrementStudioAmount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">
            Studios Capacity
          </h5>
          {studioCapacities.map((studio, index) => (
            <input
              key={index}
              type={"number"}
              className="w-3/12 mb-2 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center"
              placeholder={"Studio " + parseInt(index + 1)}
              value={studio}
              onChange={(e) =>
                setStudioCapacities((current) =>
                  current.map((cap, inputIndex) => {
                    if (inputIndex === index) {
                      return e.target.value;
                    } else {
                      return cap;
                    }
                  })
                )
              }
            />
          ))}
        </div>

        <div className="w-full flex flex-col justify-center items-center m-4">
          <input
            type="submit"
            value={"Add"}
            className="w-3/12 bg-slate-900 text-white font-poppins font-medium p-2 text-center rounded-xl"
          />
        </div>
      </form>
    </div>
  );
};

export default cinemas;

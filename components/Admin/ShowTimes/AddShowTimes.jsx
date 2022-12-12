import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import React from "react";
import useUnary from "../../../hooks/useUnary";
import { useSetLoading, useToast } from "../../../store/stores";

const AddShowTimes = ({ adminDetails }) => {
  const [hour, incrementHour, decrementHour] = useUnary(1, 10, 1, 1);
  const [minutes, incrementMinutes, decrementMinutes] = useUnary(5, 55, 5, 5);
  const [setLoading, setLoadingText] = useSetLoading();
  const [toastSuccess, toastError] = useToast();
  const addShowTimeMutation = useMutation(() => addShowTime(), {
    onMutate: () => {
      setLoadingText("Adding new show time");
      setLoading(true);
    },
    onError: (result) => {
      setLoading(false);
      toastError(result.reason);
    },
    onSuccess: () => {
      setLoading(false);
      toastSuccess("Show time successfully added");
    },
  });

  const addShowTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = cinemaContract();
    const timeInSeconds = hour * 3600 + minutes * 60;
    const addShowTime = await contract.addShowTime(
      adminDetails.region,
      adminDetails.cinema,
      timeInSeconds
    );
    const waitTransaction = await provider.waitForTransaction(addShowTime.hash);
    return waitTransaction;
  };

  return (
    <div className="flex flex-col items-center bg-slate-200 shadow-lg rounded-lg w-5/6 gap-4 h-72">
      <h1 className="font-poppins m-2 font-medium text-center">
        Add Show Times
      </h1>
      <div className="flex justify-center h-3/6 gap-4 items-center">
        <div className="flex items-center h-full justify-center">
          <h5 className="font-poppins m-2 font-medium text-sm">Hour</h5>
          <div className="flex flex-col h-full items-center justify-center gap-2">
            <button
              className="p-2 bg-black rounded-lg shadow-md"
              onClick={() => incrementHour()}
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <input
              type={"number"}
              className="bg-slate-100 shadow-md rounded-lg p-2 w-12 h-12 text-center font-poppins"
              value={hour}
            />
            <button
              className="p-2 bg-black rounded-lg shadow-md"
              onClick={() => decrementHour()}
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center h-full justify-center">
          <div className="flex flex-col h-full items-center justify-center gap-2">
            <button
              className="p-2 bg-black rounded-lg shadow-md"
              onClick={() => incrementMinutes()}
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <input
              type={"number"}
              className="bg-slate-100 shadow-md rounded-lg p-2 w-12 h-12 text-center font-poppins"
              value={minutes}
            />
            <button
              className="p-2 bg-black rounded-lg shadow-md"
              onClick={() => decrementMinutes()}
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <h5 className="font-poppins m-2 font-medium text-sm">Minutes</h5>
        </div>
      </div>
      <button
        className="p-2 m-2 bg-black text-white font-poppins font-medium text-sm rounded-md w-3/6"
        onClick={() => addShowTimeMutation.mutate()}
      >
        Submit
      </button>
    </div>
  );
};

export default AddShowTimes;

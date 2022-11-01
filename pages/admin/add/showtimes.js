import React, { useEffect, useState } from "react";
import useToggle from "../../../hooks/useToggle";
import useUnary from "../../../hooks/useUnary";
import { cinemaContract } from "../../../hooks/useContract";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useSetLoading, useToast } from "../../../store/stores";
import {
  fetchShowTimes,
  fetchStudioShowTimes,
} from "../../../fetchers/fetchers";

const showtimes = () => {
  const [hour, incrementHour, decrementHour] = useUnary(1, 10, 1, 1);
  const [minutes, incrementMinutes, decrementMinutes] = useUnary(5, 55, 5, 5);
  const [setLoading, setLoadingText] = useSetLoading();
  const [toastSuccess, toastError] = useToast();
  const [showStudio, toggleShowStudio] = useToggle(false);

  const showTimes = useQuery(["showTimes", 6996, 1], () =>
    fetchShowTimes(6996, 1)
  );

  const studioShowTimes = useQuery(["studioShowTimes", 6996, 1, 1], () =>
    fetchStudioShowTimes(6996, 1, 1)
  );

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

  const addStudioShowTimesMutation = useMutation(() => addShowTimesToStudio(), {
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

  const addShowTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = cinemaContract();
    const timeInSeconds = hour * 3600 + minutes * 60;
    const addShowTime = await contract.addShowTime(12345, 1, timeInSeconds);
    const waitTransaction = await provider.waitForTransaction(addShowTime.hash);
    return waitTransaction;
  };

  const addShowTimesToStudio = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = cinemaContract();
    const timeInSeconds = hour * 3600 + minutes * 60;
    const addShowTimes = await contract.addStudioShowTimes(
      12345,
      1,
      timeInSeconds
    );
    const waitTransaction = await provider.waitForTransaction(
      addShowTimes.hash
    );
    return waitTransaction;
  };

  useEffect(() => {
    console.log(showTimes.data);
    console.log(studioShowTimes.data);
  }, [studioShowTimes.isLoading]);

  return (
    <div className="w-full h-full">
      {/* <div className="text-center">
        <h1 className="font-poppins font-semibold text-2xl m-4 p-2">
          Manage Show Times
        </h1>
      </div>
      <div className="flex h-5/6 justify-around items-center">
        <div className="h-full w-5/12 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center bg-slate-200 shadow-lg rounded-lg w-full gap-4 h-3/6">
            <h1 className="font-poppins m-2 font-medium text-center">
              Add Show Times
            </h1>
            <div className="flex justify-center h-full gap-4 items-center">
              <div className="flex items-center h-full justify-center">
                <h5 className="font-poppins m-2 font-medium text-sm">Hour</h5>
                <div className="flex flex-col h-4/6 items-center justify-around">
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
                <div className="flex flex-col h-4/6 items-center justify-around">
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
                <h5 className="font-poppins m-2 font-medium text-sm">
                  Minutes
                </h5>
              </div>
            </div>
            <button
              className="p-2 m-2 bg-black text-white font-poppins font-medium text-sm rounded-lg w-1/6"
              onClick={() => addShowTimeMutation.mutate()}
            >
              Submit
            </button>
          </div>
          <div className="bg-slate-200 shadow-lg rounded-lg w-full h-72">
            <h1 className="font-poppins m-2 font-medium p-2 text-center">
              Current Show Times
            </h1>
          </div>
        </div>
        <div className="h-full w-5/12 flex flex-col justify-around items-center">
          <div className="bg-slate-200 shadow-lg rounded-lg w-full h-full">
            <div className="h-2/6">
              <div className="text-center m-2">
                <h2 className="font-poppins m-2 font-medium p-2 text-center">
                  Add Show Times To Studio
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center m-2 h-4/6 relative">
                <h5 className="m-2 font-poppins font-sm">Select Studio</h5>
                <div className="w-2/6 p-3 flex justify-between items-center bg-slate-100 shadow-md rounded-lg">
                  <h5 className="font-poppins text-sm">Studio 1</h5>
                  <button onClick={() => toggleShowStudio()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={
                        !showStudio
                          ? "transition duration-300 ease-in-out w-4 h-4"
                          : "transition duration-300 ease-in-out w-4 h-4 rotate-90"
                      }
                      strokeWidth={2}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={
                    !showStudio
                      ? "absolute overflow-hidden h-0 transition duration-300"
                      : "absolute w-2/6 p-2 bg-slate-100 shadow-md rounded-b-lg transition duration-300 -bottom-4"
                  }
                >
                  <button className="font-poppins p-2 w-full text-sm text-start">
                    Studio 1
                  </button>
                </div>
              </div>
            </div>
            <div className="h-3/6">
              <h2 className="font-poppins m-2 font-medium text-center">
                Studio Show Times
              </h2>
              <div className="flex gap-4 justify-center items-center h-full px-4">
                <div className="w-3/6 h-full">
                  <h3 className="font-poppins text-sm m-2 text-center">
                    Available Show Time
                  </h3>
                  <div className="w-full bg-slate-100 shadow-md rounded-lg h-4/6 flex flex-col items-center justify-center">
                    {showTimes.length < 1 ? (
                      <h5 className="text-center font-poppins text-xs">
                        No Show Times
                      </h5>
                    ) : (
                      showTimes.map((showTime, index) => (
                        <button
                          key={index}
                          className="p-2 border mb-2 border-slate-300 rounded-xl w-3/6 h-20 text-center transition duration-200 ease-in-out hover:bg-black hover:text-white"
                        >
                          <p className="font-poppins text-sm">{"test"}</p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
                <div className="w-3/6 h-full">
                  <h3 className="font-poppins text-sm m-2 text-center">
                    Current Show Times
                  </h3>
                  <div className="w-full bg-slate-100 shadow-md rounded-lg h-4/6">
                    <div className="flex flex-col items-center justify-center py-3 h-full">
                      {showTimes.length < 1 ? (
                        <h5 className="text-center font-poppins text-xs">
                          No Show Times
                        </h5>
                      ) : (
                        studioShowTimes.map((showTime, index) => (
                          <div
                            key={index}
                            className="p-2 border mb-2 border-slate-300 rounded-xl w-3/6 text-center"
                          >
                            <p className="font-poppins text-sm">{showTime}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center m-2 mx-auto">
              <button
                className="bg-black p-2 rounded-lg text-white font-poppins text-sm w-2/6"
                onClick={() => addShowTimeMutation.mutate()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default showtimes;

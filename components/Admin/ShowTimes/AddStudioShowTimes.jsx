import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import { cinemaContract } from "../../../hooks/useContract";
import useToggle from "../../../hooks/useToggle";
import { useLoading, useToast } from "../../../store/stores";
import { useShowTimes } from "../../reactQuery/queries/Cinema/useShowTimes";
import { useStudioShowTimes } from "../../reactQuery/queries/Cinema/useStudioShowTimes";
import { useCinemaDetails } from "../../reactQuery/queries/Cinema/useCinemaDetails";
import { query } from "@/components/reactQuery/query";

const AddStudioShowTimes = ({ region, cinema }) => {
  const [selectedShowTimes, setSelectedShowTimes] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(1);
  const [showStudio, toggleShowStudio] = useToggle(false);
  const [setLoading, setLoadingText] = useLoading();
  const [toastSuccess, toastError] = useToast();
  const showTimes = query({
    queryKey: ["cinemaShowtimes", region, cinema],
    queryFunction: async () =>
      await useShowTimes({
        cinema: cinema,
        region: region,
      }),
  });
  const studioShowTimes = useStudioShowTimes({
    cinema: cinema,
    region: region,
    studio: selectedStudio,
  });
  const cinemaDetails = useCinemaDetails({
    cinema: cinema,
    region: region,
  });

  const getStudios = () => {
    let studio = [];
    for (let i = 0; i < cinemaDetails.data?.studiosAmount; ++i) {
      studio.push(i + 1);
    }
    return studio;
  };

  return (
    <div className="bg-slate-200 shadow-lg rounded-lg w-5/6 h-auto">
      <div className="h-2/6">
        <div className="text-center m-2">
          <h2 className="font-poppins m-2 font-medium p-2 text-center">
            Add Show Times To Studio
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-4/6 relative">
          <h5 className="m-2 font-poppins font-sm">Select Studio</h5>
          <div className="flex justify-center relative w-full text-center">
            <div className="w-3/6 p-3 flex justify-between items-center bg-slate-100 shadow-md rounded-lg">
              <h5 className="font-poppins text-sm">
                {"Studio " + selectedStudio}
              </h5>
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
                  : "absolute w-3/6 p-2 bg-slate-100 shadow-md rounded-b-lg transition duration-300 -bottom-28"
              }
            >
              {getStudios().map((studio, index) => (
                <button
                  key={index}
                  className="font-poppins p-2 w-full text-sm text-start"
                  onClick={() => {
                    setSelectedStudio(studio);
                    toggleShowStudio();
                  }}
                >
                  Studio {studio}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-3/6">
        <div className="flex gap-4 justify-center items-center h-full px-4">
          <div className="w-3/6 h-full">
            <h3 className="font-poppins text-sm m-2 text-center">
              Available Show Time
            </h3>
            <div className="w-full bg-slate-100 shadow-md rounded-lg h-full flex flex-col items-center justify-center overflow-y-scroll py-3">
              {showTimes.isLoading && (
                <>
                  <p className="font-poppins m-2 my-3">Fetching Show Times</p>
                  <MoonLoader
                    loading={studioShowTimes.isLoading}
                    size={25}
                    color={"black"}
                  />
                </>
              )}
              {!showTimes.isLoading &&
                (showTimes.data.length < 1 ? (
                  <h5 className="text-center font-poppins text-xs">
                    No Show Times
                  </h5>
                ) : (
                  showTimes.data.map((showTime, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedShowTimes((current) => [
                          ...current,
                          showTime,
                        ])
                      }
                      className="p-2 border mb-2 border-slate-300 rounded-md w-3/6 h-1/6 text-center transition duration-200 ease-in-out hover:bg-black hover:text-white"
                    >
                      <p className="font-poppins text-sm">
                        {parseInt(showTime)}
                      </p>
                    </button>
                  ))
                ))}
            </div>
          </div>
          <div className="w-3/6 h-full">
            <h3 className="font-poppins text-sm m-2 text-center">
              Current Show Times
            </h3>
            <div className="w-full bg-slate-100 shadow-md rounded-lg h-4/6 overflow-y-scroll">
              <div className="flex flex-col items-center justify-center py-3 h-full">
                {studioShowTimes.isLoading ? (
                  <>
                    <p className="font-poppins m-2 my-3">Fetching Show Times</p>
                    <MoonLoader
                      loading={studioShowTimes.isLoading}
                      size={25}
                      color={"black"}
                    />
                  </>
                ) : studioShowTimes.data.length < 1 ? (
                  <h5 className="text-center font-poppins text-xs">
                    No Show Times
                  </h5>
                ) : (
                  studioShowTimes.data.map((showTime, index) => (
                    <button
                      key={index}
                      className="p-2 border mb-2 border-slate-300 rounded-md w-3/6 h-1/6 text-center transition duration-200 ease-in-out hover:bg-black hover:text-white"
                    >
                      <p className="font-poppins text-sm">
                        {parseInt(showTime)}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center m-4 mx-auto">
        <button
          className="bg-black p-2 rounded-lg text-white font-poppins text-sm w-2/6"
          onClick={() => addStudioShowTimesMutation.mutate()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddStudioShowTimes;

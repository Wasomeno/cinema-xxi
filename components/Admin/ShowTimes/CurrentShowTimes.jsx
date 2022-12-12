import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MoonLoader } from "react-spinners";
import { fetchShowTimes } from "../../../fetchers/fetchers";

const CurrentShowTimes = ({ adminDetails }) => {
  const showTimes = useQuery(
    ["showTimes", adminDetails.region, adminDetails.cinema],
    () => fetchShowTimes(adminDetails.region, adminDetails.cinema)
  );
  return (
    <div className="bg-slate-200 shadow-lg rounded-lg w-5/6 h-40">
      <h1 className="font-poppins m-2 font-medium p-2 text-center">
        Current Show Times
      </h1>
      <div className="flex items-center justify-center gap-2">
        {showTimes.isLoading && (
          <div className="flex flex-col justify-center items-center">
            <p className="font-poppins m-2 my-3">Fetching Show Times</p>
            <MoonLoader
              loading={showTimes.isLoading}
              size={25}
              color={"black"}
            />
          </div>
        )}
        {!showTimes.isLoading &&
          showTimes.data.map((showtime, index) => (
            <div
              key={index}
              className="bg-slate-100 text-center shadow-md p-2 rounded-lg w-2/6"
            >
              {parseInt(showtime)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentShowTimes;

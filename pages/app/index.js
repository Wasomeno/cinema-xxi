import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchCinemaMovies, fetchRegions } from "../../fetchers/fetchers";

const index = () => {
  const router = useRouter();
  const [showDrop, setShowDrop] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const fetchedRegions = useQuery(["regions"], () => fetchRegions());
  const fetchedMovies = useQuery(
    ["movies", selectedRegion, 1, 1],
    () => fetchCinemaMovies(selectedRegion, 1),
    { enabled: selectedRegion !== 0, staleTime: 50000 }
  );

  const toggleDropDown = () => {
    setShowDrop((current) => !current);
  };

  const selectRegion = (region) => {
    setSelectedRegion(parseInt(region));
    toggleDropDown();
  };

  useEffect(() => {
    if (!fetchedRegions.isLoading)
      setSelectedRegion(parseInt(fetchedRegions.data[1]));
  }, [fetchedMovies.isLoading, fetchedRegions.isLoading]);

  return (
    <div className="p-2 w-full h-full rounded-xl overflow-hidden flex flex-col items-center">
      <div className="flex items-center justify-center">
        <h1 className="font-poppins text-xl font-medium p-2 m-4 lg:text-2xl xl:text-3xl">
          Movies On Show
        </h1>
      </div>
      <div className="flex flex-col items-start justify-start self-start">
        <button
          className="w-40 lg:w-60 xl:w-60 p-1 lg:p-2 xl:p-2 flex justify-between items-center bg-slate-200 rounded-xl"
          data-dropdown-toggle="dropdown"
          onClick={toggleDropDown}
        >
          <h5 className="font-poppins font-medium m-2 text-sm lg:text-base xl:text-base">
            {selectedRegion}
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={
              !showDrop
                ? "w-6 h-6 transition ease-in-out duration-300"
                : "w-6 h-6 transition ease-in-out duration-300 rotate-90"
            }
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          hidden={!showDrop ? true : false}
          className="transition duration-300 bg-slate-200 rounded-b-xl shadow-md my-2 p-2 w-40 lg:w-60 xl:w-60 absolute top-28 lg:top-32 xl:top-32"
        >
          <ul className="">
            {fetchedMovies.isLoading ? (
              <li className="font-poppins font-medium p-1 cursor-pointer transition duration-300 rounded-xl hover:bg-slate-300 text-sm lg:text-base xl:text-base lg:p-2 xl:p-2">
                Region
              </li>
            ) : (
              fetchedRegions.data.map((region, index) => (
                <li
                  key={index}
                  className="font-poppins font-medium p-1 cursor-pointer transition duration-300 rounded-xl hover:bg-slate-300 text-sm lg:text-base xl:text-base lg:p-2 xl:p-2"
                  onClick={() => selectRegion(region)}
                >
                  {parseInt(region)}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-start my-3 p-3 max-w-full overflow-x-scroll">
        {fetchedMovies.isLoading ? (
          <div className="m-2">
            <div className="w-40 h-60 lg:w-60 lg:h-80 xl:w-60 xl:h-80 rounded-xl bg-slate-600 transition ease-in-out duration-300 cursor-pointer hover:scale-105">
              Movie
            </div>
            <div>
              <h5 className="font-poppins m-3 text-center text-xl font-normal">
                Movie
              </h5>
            </div>
          </div>
        ) : (
          fetchedMovies.data.map((movie, index) => (
            <div key={index} className="m-2">
              <div
                onClick={() => router.push("/app/movie/" + movie)}
                className="w-40 h-60 lg:w-60 lg:h-80 xl:w-60 xl:h-80 rounded-xl bg-slate-600 transition ease-in-out duration-300 cursor-pointer hover:scale-105"
              ></div>
              <div>
                <h5 className="font-poppins m-3 text-center text-lg font-medium">
                  {movie}
                </h5>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default index;

import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React from "react";
import { MoonLoader } from "react-spinners";
import { fetchAllMovies } from "../../../fetchers/fetchers";

const AvailableMovies = ({ selectedMovies, setSelectedMovies }) => {
  const fetchedMovies = useQuery(["allMovies"], () => fetchAllMovies());
  const selectMovie = (index) => {
    if (selectedMovies.includes(index)) return;
    setSelectedMovies((currentSelected) => [
      ...currentSelected,
      parseInt(index),
    ]);
  };
  return (
    <div className="w-5/6 h-2/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
      <h2 className="font-poppins font-medium text-lg text-center m-2">
        Movies Available
      </h2>
      <div className="flex flex-col h-full items-center">
        {fetchedMovies.isLoading ? (
          <>
            <p className="font-poppins m-2 my-3">Fetching Movies</p>
            <MoonLoader
              loading={fetchedMovies.isLoading}
              size={25}
              color={"black"}
            />
          </>
        ) : (
          <div className="flex flex-col gap-3 h-4/6 items-center overflow-y-scroll">
            {fetchedMovies.data?.map((movie, index) => (
              <button
                key={index}
                onClick={() => selectMovie(index)}
                className="font-poppins font-normal text-center text-sm p-2 shadow-md bg-slate-200 rounded-lg w-5/6 transition duration-300 ease-in-out hover:bg-white"
              >
                {ethers.utils.parseBytes32String(movie)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableMovies;

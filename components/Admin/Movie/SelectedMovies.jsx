import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React from "react";
import { fetchAllMovies } from "../../../fetchers/fetchers";

const SelectedMovies = ({ selectedMovies, setSelectedMovies }) => {
  const fetchedMovies = useQuery(["allMovies"], () => fetchAllMovies());
  const deselectMovie = (selectedIndex) => {
    setSelectedMovies((currentSelected) =>
      currentSelected.filter((movie, index) => {
        return index !== selectedIndex;
      })
    );
  };
  return (
    <div className="w-5/6 h-1/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
      <h2 className="font-poppins font-medium text-lg text-center m-2 h-1/6">
        Selected Movies
      </h2>
      {selectedMovies.length === 0 ? (
        <div className="flex h-4/6 items-center justify-center">
          <h3 className="font-poppins">No Movies Selected</h3>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center h-4/6 overflow-y-scroll m-2 p-2">
          {selectedMovies.map((movie, index) => (
            <button
              key={index}
              onClick={() => deselectMovie(index)}
              className="font-poppins font-normal text-center text-sm p-2 shadow-md bg-slate-200 rounded-lg w-5/6 transition duration-300 ease-in-out hover:bg-red-200"
            >
              {ethers.utils.parseBytes32String(fetchedMovies?.data[movie])}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedMovies;

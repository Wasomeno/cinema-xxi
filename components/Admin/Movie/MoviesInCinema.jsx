import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MoonLoader } from "react-spinners";
import { fetchCinemaMovies } from "../../../fetchers/fetchers";

const MoviesInCinema = ({ adminDetails }) => {
  const fetchedMovies = useQuery(["allMovies"], () => fetchAllMovies());
  const fetchedCinemaMovies = useQuery(
    ["moviesInCinema", adminDetails.region, adminDetails.cinema],
    () => fetchCinemaMovies(adminDetails.region, adminDetails.cinema)
  );
  return (
    <div className="w-5/6 h-2/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
      <h2 className="font-poppins font-medium text-lg text-center m-2">
        Current Movies
      </h2>
      <div className="flex flex-col gap-3 items-center h-4/6 overflow-y-scroll p-2">
        {fetchedCinemaMovies.isLoading ? (
          <>
            <p className="font-poppins m-2 my-3">Fetching Movies</p>
            <MoonLoader
              loading={fetchedCinemaMovies.isLoading}
              size={25}
              color={"black"}
            />
          </>
        ) : (
          fetchedCinemaMovies.data.map((movie, index) => (
            <button
              key={index}
              onClick={() => selectMovie(index)}
              className="font-poppins font-normal text-center text-sm p-2 shadow-md bg-slate-200 rounded-lg w-5/6 transition duration-300 ease-in-out hover:bg-white"
            >
              {movie}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesInCinema;

import { query } from "@/components/reactQuery/query";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import { ethers } from "ethers";
import React from "react";
import { MoonLoader } from "react-spinners";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";

const AvailableMovies = ({ selectedMovies, setSelectedMovies }) => {
  const fetchedMovies = query({
    queryKey: ["allMovies"],
    queryFunction: async () => await useAllMovies(),
  });

  const selectMovie = (movieId, movieTitle) => {
    if (selectedMovies.includes(movieId)) return;
    setSelectedMovies((currentSelected) => [
      ...currentSelected,
      { movieId: movieId, title: movieTitle },
    ]);
  };

  return (
    <div className="p-2">
      <div className="my-2">
        <Subtitle size="sm" text="Available Movies" />
      </div>
      <div className="flex flex-col h-full items-center">
        {fetchedMovies.isLoading ? (
          <>
            <Paragraph text="Fetching Movies" size="sm" />
            <MoonLoader
              loading={fetchedMovies.isLoading}
              size={25}
              color={"black"}
            />
          </>
        ) : (
          <div className="w-full h-36 flex flex-col gap-3  items-center overflow-y-scroll p-2">
            {fetchedMovies.data.length < 1 ? (
              <Paragraph text="No Available Movies" size="sm" margin="4" />
            ) : (
              fetchedMovies.data?.map((movie, index) => (
                <button
                  key={index}
                  onClick={() => selectMovie(movie.movieId, movie.title)}
                  className="font-poppins font-normal text-center text-sm p-2 shadow-md bg-slate-200 rounded-lg w-5/6 transition duration-300 ease-in-out hover:bg-white"
                >
                  {ethers.utils.parseBytes32String(movie.title)}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableMovies;

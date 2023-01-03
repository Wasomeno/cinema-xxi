import { Paragraph } from "@/components/shared/Texts";
import { parseBytes32String } from "ethers/lib/utils";
import React from "react";

const SelectedMovies = ({ selectedMovies, setSelectedMovies }) => {
  const deselectMovie = (selected) => {
    setSelectedMovies((currentSelected) =>
      currentSelected.filter((movie, index) => {
        return movie.movieId !== selected;
      })
    );
  };
  return (
    <div className="p-2">
      <div className="mt-2">
        <Paragraph text="Selected Movies" size="sm" style="medium" />
      </div>
      {selectedMovies.length < 1 ? (
        <div className="text-center">
          <Paragraph text="No Movies Selected" size="sm" margin="4" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center h-4/6 overflow-y-scroll m-2 p-2">
          {selectedMovies.map((movie, index) => (
            <button
              key={index}
              onClick={() => deselectMovie(movie.movieId)}
              className="font-poppins font-normal text-center text-sm p-2 shadow-md bg-slate-200 rounded-lg w-5/6 transition duration-300 ease-in-out hover:bg-red-200"
            >
              {parseBytes32String(movie.title)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedMovies;

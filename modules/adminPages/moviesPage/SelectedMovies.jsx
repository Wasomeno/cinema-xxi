import { Paragraph } from "@/components/shared/Texts";
import { parseBytes32String } from "ethers/lib/utils";
import MovieListCard from "@/components/MovieListCard";
import React from "react";

const SelectedMovies = ({ selectedMovies, deselectMovie }) => {
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
            <MovieListCard
              key={index}
              movieTitle={movie}
              clickable
              onClick={() => deselectMovie(movie.movieId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedMovies;

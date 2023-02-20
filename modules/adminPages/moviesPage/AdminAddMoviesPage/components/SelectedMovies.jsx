import React from "react";

import MovieListCard from "@/components/MovieListCard";
import { Paragraph } from "@/components/shared/Texts";

const SelectedMovies = ({ selectedMovies, deselectMovie }) => {
  return (
    <div className="w-full p-2 lg:w-5/6">
      <div className="mt-2">
        <Paragraph size="sm" style="medium">
          Selected Movies
        </Paragraph>
      </div>
      {selectedMovies.length < 1 ? (
        <div className="text-center">
          <Paragraph size="sm" margin="4">
            No Movies Selected
          </Paragraph>
        </div>
      ) : (
        <div className="m-2 flex max-h-52 flex-col items-center gap-3 overflow-y-scroll p-2">
          {selectedMovies.map((movie, index) => (
            <MovieListCard
              key={index}
              movieTitle={movie.title}
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

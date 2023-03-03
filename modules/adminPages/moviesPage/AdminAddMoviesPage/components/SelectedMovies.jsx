import React from "react";

import { MovieListClickable } from "@/components/MovieListCard";
import { Paragraph } from "@/components/shared/Texts";

const SelectedMovies = ({ selectedMovies, deselectMovie }) => {
  return (
    <div className="w-full p-2 lg:w-5/6">
      <div className="mt-2">
        <Paragraph size="sm" style="medium">
          Selected Movies
        </Paragraph>
      </div>
      <div className="flex h-52 items-center justify-center lg:h-80">
        {selectedMovies.length < 1 ? (
          <Paragraph size="sm" margin="4">
            No Movies Selected
          </Paragraph>
        ) : (
          <div className="m-2 flex w-full flex-col items-center gap-3 overflow-y-scroll p-2">
            {selectedMovies.map((movie) => (
              <MovieListClickable
                key={movie.id}
                movie={movie}
                onClick={() => deselectMovie(movie.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedMovies;

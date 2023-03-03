import React from "react";

import DataContainer from "@/components/DataContainer";
import { MovieListClickable } from "@/components/MovieListCard";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import { Paragraph } from "@/components/shared/Texts";

const AvailableMovies = ({ selectMovie }) => {
  const fetchedMovies = useAllMovies();
  return (
    <div className="w-full p-2 lg:w-5/6">
      <div className="my-2">
        <Paragraph size="sm" style="medium">
          Available Movies
        </Paragraph>
      </div>
      <DataContainer object="movies" loading={false}>
        <div className="relative flex h-52 flex-col items-center gap-3 overflow-y-scroll p-2 first-letter:w-full lg:h-96">
          {fetchedMovies.data?.length < 1 ? (
            <Paragraph size="sm" margin="4">
              No Available Movies
            </Paragraph>
          ) : (
            fetchedMovies.data?.map((movie) => (
              <MovieListClickable
                key={movie.id}
                movie={movie}
                onClick={() => selectMovie(movie)}
              />
            ))
          )}
        </div>
      </DataContainer>
    </div>
  );
};

export default AvailableMovies;

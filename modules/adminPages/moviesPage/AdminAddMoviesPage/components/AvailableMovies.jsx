import React from "react";

import DataContainer from "@/components/DataContainer";
import MovieListCard from "@/components/MovieListCard";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import { Paragraph, Subtitle } from "@/components/shared/Texts";

const AvailableMovies = ({ selectMovie }) => {
  const fetchedMovies = useAllMovies();
  return (
    <div className="w-full p-2 lg:w-5/6">
      <div className="my-2">
        <Subtitle size="sm">Available Movies</Subtitle>
      </div>
      <DataContainer className="p-2" object="movies" loading={false}>
        <div className="relative flex max-h-52 flex-col items-center gap-3 overflow-y-scroll first-letter:w-full">
          {fetchedMovies.data?.length < 1 ? (
            <Paragraph size="sm" margin="4">
              No Available Movies
            </Paragraph>
          ) : (
            fetchedMovies.data?.map((movie, index) => (
              <MovieListCard
                key={index}
                movieTitle={movie.title}
                clickable
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

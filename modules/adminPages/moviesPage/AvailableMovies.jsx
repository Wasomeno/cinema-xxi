import { query } from "@/components/reactQuery/query";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import { ethers } from "ethers";
import React from "react";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import DataContainer from "@/components/DataContainer";
import MovieListCard from "@/components/MovieListCard";

const AvailableMovies = ({ selectMovie }) => {
  const fetchedMovies = useAllMovies();

  return (
    <div className="p-2">
      <div className="my-2">
        <Subtitle size="sm" text="Available Movies" />
      </div>
      <DataContainer
        className="flex flex-col h-full items-center"
        object="movies"
        loading={fetchedMovies.isLoading}
      >
        <div className="w-full h-36 flex flex-col gap-3  items-center overflow-y-scroll p-2">
          {fetchedMovies.data?.length < 1 ? (
            <Paragraph text="No Available Movies" size="sm" margin="4" />
          ) : (
            fetchedMovies.data?.map((movie, index) => (
              <MovieListCard
                key={index}
                movieTitle={movie.title}
                clickable
                onClick={() => selectMovie(movie.title)}
              />
            ))
          )}
        </div>
      </DataContainer>
    </div>
  );
};

export default AvailableMovies;

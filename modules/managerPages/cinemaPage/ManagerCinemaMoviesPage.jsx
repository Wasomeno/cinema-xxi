import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { MovieListCard } from "@/components/MovieListCard";
import { useCinemaMovies } from "@/components/reactQuery/queries/Cinema/useCinemaMovies";
import { Paragraph, Subtitle } from "@/components/shared/Texts";

export const ManagerCinemaMoviesPage = () => {
  const { regionId, cinemaId } = useRouter().query;
  const cinemaMovies = useCinemaMovies({
    region: regionId,
    cinema: cinemaId,
  });
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerDashboardHeader title="Movies" withBackButton />
      <div className="my-4">
        <Subtitle text="List of Movies" size="sm" />
      </div>
      <DataContainer
        object="movies"
        className="flex flex-col items-center justify-start gap-4 p-2"
        loading={false}
      >
        {cinemaMovies.data.length < 1 ? (
          <div className="text-center">
            <Paragraph text="No active movies" size="xs" />
          </div>
        ) : (
          cinemaMovies.data?.map((movie, index) => (
            <MovieListCard key={index} movieTitle={movie.movieTitle} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

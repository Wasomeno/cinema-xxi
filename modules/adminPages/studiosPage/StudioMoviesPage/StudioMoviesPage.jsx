import AdminHeader from "@/components/Headers/AdminHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import MovieListCard from "@/components/MovieListCard";
import { useStudioMovies } from "@/components/reactQuery/queries/Cinema/useStudioMovies";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import { useRouter } from "next/router";
import React from "react";
import MoviesInStudioMenu from "./MoviesInStudioMenu";

export const StudioMoviesPage = () => {
  const { query } = useRouter();
  const moviesInStudio = useStudioMovies({
    region: 1,
    cinema: 1,
    studio: query.studio,
  });

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader
        title="Movies in Studio"
        withBackButton
        withOption
        OptionMenu={<MoviesInStudioMenu studio={1} />}
      />
      <div className="my-4">
        <Subtitle text="List of Movies" size="sm" />
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4 p-4"
        object="movies"
        loading={moviesInStudio.isLoading}
      >
        {moviesInStudio.data?.length < 1 ? (
          <Paragraph text="No Active Movies" size="sm" />
        ) : (
          moviesInStudio.data?.map((movie) => (
            <MovieListCard movieTitle={movie.title} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

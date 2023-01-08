import AdminHeader from "@/components/Admin/AdminHeader";
import { parseBytes32String } from "ethers/lib/utils.js";
import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import MoviesInStudioMenu from "modules/adminPages/moviesPage/MoviesInStudioMenu";
import React from "react";
import { useStudioMovies } from "@/components/reactQuery/queries/Cinema/useStudioMovies";
import { useRouter } from "next/router";
import MovieListCard from "modules/managerPages/moviesPage/MovieListCard";

const StudioMovies = () => {
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
        className="p-4 flex flex-col gap-4 justify-start items-center"
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

export default StudioMovies;

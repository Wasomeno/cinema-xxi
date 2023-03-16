import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { useStudioMovies } from "@/components/reactQuery/queries/Cinema/useStudioMovies";
import { Subtitle } from "@/components/shared/Texts";

export const StudioMoviesPage = () => {
  const { query } = useRouter();
  const moviesInStudio = useStudioMovies({
    region: 1,
    cinema: 1,
    studio: query.studio,
  });

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader withBackButton>Movies in Studio</AdminHeader>
      <div className="my-4">
        <Subtitle text="List of Movies" size="sm" />
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4 p-4"
        object="movies"
        loading={false}
      >
        {/* {moviesInStudio.data?.length < 1 ? (
          <Paragraph text="No Active Movies" size="sm" />
        ) : (
          moviesInStudio.data?.map((movie, index) => (
            <MovieListCard key={index} movieTitle={movie.title} />
          ))
        )} */}
      </DataContainer>
    </AnimatedContainer>
  );
};

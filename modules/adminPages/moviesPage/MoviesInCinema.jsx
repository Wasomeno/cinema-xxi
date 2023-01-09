import { Paragraph, Subtitle } from "@/components/shared/Texts";
import { parseBytes32String } from "ethers/lib/utils.js";
import { MoonLoader } from "react-spinners";
import { useCinemaMovies } from "@/components/reactQuery/queries/Movie/useCinemaMovies";
import DataContainer from "@/components/DataContainer";
import MovieListCard from "@/components/MovieListCard";

const MoviesInCinema = ({ region, cinema }) => {
  const fetchedCinemaMovies = useCinemaMovies({
    region: region,
    cinema: cinema,
  });

  return (
    <div className="w-full p-2">
      <div className="my-2">
        <Subtitle text="List of Movies" size="sm" />
      </div>
      <DataContainer
        className="flex flex-col gap-3 items-center h-4/6 overflow-y-scroll p-2"
        object="Movies"
        loading={fetchedCinemaMovies.isLoading}
      >
        {fetchedCinemaMovies.data?.length < 1 ? (
          <Paragraph text="No Active Movies" size="sm" />
        ) : (
          fetchedCinemaMovies.data?.map((movie, index) => (
            <MovieListCard
              key={index}
              movieTitle={movie.movieTitle}
              clickable
              onClick={() => selectMovie(index)}
            />
          ))
        )}
      </DataContainer>
    </div>
  );
};

export default MoviesInCinema;

import DataContainer from "@/components/DataContainer";
import { MovieListClickable } from "@/components/MovieListCard";
import { useCinemaMovies } from "@/components/reactQuery/queries/Cinema/useCinemaMovies";
import { Paragraph } from "@/components/shared/Texts";

export const AvailableMovies = ({ selectMovie }) => {
  const moviesInCinema = useCinemaMovies({ cinemaId: 2 });
  return (
    <div className="my-2">
      <div className="my-4">
        <Paragraph size="xs">Available Movies</Paragraph>
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4 p-2"
        object="movies"
        loading={false}
      >
        {moviesInCinema.data?.movie.length < 1 ? (
          <Paragraph size="sm">No active movies</Paragraph>
        ) : (
          moviesInCinema.data?.movie.map((movie) => (
            <MovieListClickable
              key={movie.id}
              movie={movie}
              onClick={() => selectMovie(movie)}
            />
          ))
        )}
      </DataContainer>
    </div>
  );
};

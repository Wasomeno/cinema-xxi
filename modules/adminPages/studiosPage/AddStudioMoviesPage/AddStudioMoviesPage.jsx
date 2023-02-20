import AdminHeader from "@/components/Headers/AdminHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import MovieListCard from "@/components/MovieListCard";
import { addStudioMovies } from "@/components/reactQuery/mutations/Cinema/addStudioMovies";
import { useStudioShowTimes } from "@/components/reactQuery/queries/Cinema/useStudioShowTimes";
import { useCinemaMovies } from "@/components/reactQuery/queries/Movie/useCinemaMovies";
import { Paragraph } from "@/components/shared/Texts";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import { useRouter } from "next/router";
import React from "react";

export const AddStudioMoviesPage = () => {
  const { query } = useRouter();
  const [selectedMovies, selectMovie, deselectMovie] = useSelectDeselect([]);
  const [selectedShowtimes, selectShowtime, deselectShowtime] =
    useSelectDeselect([]);
  const moviesInCinema = useCinemaMovies({ region: 1, cinema: 1 });
  const studioShowtimes = useStudioShowTimes({
    region: 1,
    cinema: 1,
    studio: query.studio,
  });

  const addMoviesToStudio = addStudioMovies({
    region: 1,
    cinema: 1,
    studio: query.studio,
    movies: selectedMovies,
    showtimes: selectedShowtimes,
  });

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader title="Add Movies" withBackButton />
      <div className="mb-2 p-2">
        <div className="my-4">
          <Paragraph text="Available Movies" size="sm" />
        </div>
        <DataContainer
          className="flex flex-col items-center justify-start gap-4"
          object="movies"
          loading={moviesInCinema.isLoading}
        >
          {moviesInCinema.data?.length < 1 ? (
            <Paragraph text="No available showtimes" />
          ) : (
            moviesInCinema.data?.map((movie, index) => (
              <MovieListCard
                key={index}
                movieTitle={movie.movieTitle}
                clickable
                onClick={() => selectMovie(movie)}
              />
            ))
          )}
        </DataContainer>
      </div>

      <div className="mb-2 p-2">
        <div className="my-4">
          <Paragraph text="Available Showtimes" size="sm" />
        </div>
        <DataContainer
          className="flex flex-col items-center justify-start gap-4"
          object="showtimes"
          loading={studioShowtimes.isLoading}
        >
          {studioShowtimes.data?.length < 1 ? (
            <Paragraph text="No active showtimes" size="sm" />
          ) : (
            studioShowtimes.data?.map((showtime) => (
              <div
                onClick={() => selectShowtime(showtime)}
                className="flex h-10 w-4/6 items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
              >
                {parseInt(showtime)}
              </div>
            ))
          )}
        </DataContainer>
      </div>

      <div className="p-2">
        <div className="my-4">
          <Paragraph text="Selected Movies & Showtimes" size="sm" />
        </div>
        <div className="flex h-20 justify-evenly">
          <div className="flex w-5/12 flex-col items-center justify-center gap-4 text-center">
            {selectedMovies.length < 1 ? (
              <Paragraph text="No Movies Selected" size="xs" />
            ) : (
              selectedMovies.map((selectedMovie) => (
                <div
                  onClick={() => deselectMovie(selectedMovie)}
                  className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
                >
                  <Paragraph
                    text={selectedMovie.movieTitle}
                    size="xs"
                    style="medium"
                  />
                </div>
              ))
            )}
          </div>
          <div className="flex w-5/12 flex-col items-center justify-center gap-4 text-center">
            {selectedShowtimes.length < 1 ? (
              <Paragraph text="No Showtimes Selected" size="xs" />
            ) : (
              selectedShowtimes.map((selectedShowtime) => (
                <div
                  onClick={() => deselectShowtime(selectedShowtime)}
                  className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
                >
                  <Paragraph
                    text={parseInt(selectedShowtime)}
                    size="xs"
                    style="medium"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => addMoviesToStudio()}
          className="font-poppins w-4/6 rounded-md bg-slate-900 p-2 text-sm text-white"
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

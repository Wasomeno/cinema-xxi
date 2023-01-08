import AdminHeader from "@/components/Admin/AdminHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { addStudioMovies } from "@/components/reactQuery/mutations/Cinema/addStudioMovies";
import { useStudioShowTimes } from "@/components/reactQuery/queries/Cinema/useStudioShowTimes";
import { useCinemaMovies } from "@/components/reactQuery/queries/Movie/useCinemaMovies";
import { Paragraph } from "@/components/shared/Texts";
import { ethers } from "ethers";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import MovieListCard from "modules/managerPages/moviesPage/MovieListCard";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AddStudioMovies = () => {
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
      <div className="p-2 mb-2">
        <div className="my-4">
          <Paragraph text="Available Movies" size="sm" />
        </div>
        <DataContainer
          className="flex flex-col gap-4 justify-start items-center"
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

      <div className="p-2 mb-2">
        <div className="my-4">
          <Paragraph text="Available Showtimes" size="sm" />
        </div>
        <DataContainer
          className="flex flex-col gap-4 justify-start items-center"
          object="showtimes"
          loading={studioShowtimes.isLoading}
        >
          {studioShowtimes.data?.length < 1 ? (
            <Paragraph text="No active showtimes" size="sm" />
          ) : (
            studioShowtimes.data?.map((showtime) => (
              <div
                onClick={() => selectShowtime(showtime)}
                className="w-4/6 h-10 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
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
        <div className="flex justify-evenly h-20">
          <div className="w-5/12 flex flex-col justify-center items-center text-center gap-4">
            {selectedMovies.length < 1 ? (
              <Paragraph text="No Movies Selected" size="xs" />
            ) : (
              selectedMovies.map((selectedMovie) => (
                <div
                  onClick={() => deselectMovie(selectedMovie)}
                  className="w-full h-10 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
                >
                  <Paragraph
                    text={ethers.utils.parseBytes32String(
                      selectedMovie.movieTitle
                    )}
                    size="xs"
                    style="medium"
                  />
                </div>
              ))
            )}
          </div>
          <div className="w-5/12 flex flex-col justify-center items-center text-center gap-4">
            {selectedShowtimes.length < 1 ? (
              <Paragraph text="No Showtimes Selected" size="xs" />
            ) : (
              selectedShowtimes.map((selectedShowtime) => (
                <div
                  onClick={() => deselectShowtime(selectedShowtime)}
                  className="w-full h-10 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
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
      <div className="text-center mt-4">
        <button
          onClick={() => addMoviesToStudio()}
          className="p-2 bg-slate-900 w-4/6 rounded-md text-white font-poppins text-sm"
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

export default AddStudioMovies;

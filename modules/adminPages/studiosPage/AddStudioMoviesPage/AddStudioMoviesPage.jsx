import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { addStudioMoviesShowtime } from "@/components/reactQuery/mutations/Cinema/addStudioMoviesShowtime";

import { AvailableCinemaShowtimes } from "../AddStudioShowtimesPage/components/AvailableCinemaShowtimes";
import { AvailableCinemaMovies } from "./components/AvailableCinemaMovies";
import { SelectedMoviesAndShowtimes } from "./components/SelectedMoviesAndShowtimes";

export const AddStudioMoviesPage = () => {
  const { query } = useRouter();
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedShowtime, setSelectedShowtime] = useState();

  const addStudioMoviesShowtimeMutation = addStudioMoviesShowtime({
    showtime: selectedShowtime,
    movie: selectedMovie,
    studioId: query?.studio,
  });

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll bg-opacity-95 p-4 dark:bg-slate-800">
      <AdminHeader withBackButton>Add Movies</AdminHeader>
      <div className="flex justify-center">
        <div className="flex w-11/12 flex-col items-center gap-4 lg:w-4/6">
          <AvailableCinemaMovies selectMovie={setSelectedMovie} />
          <AvailableCinemaShowtimes selectShowtime={setSelectedShowtime} />
          <SelectedMoviesAndShowtimes
            deselectMovie={() => setSelectedMovie()}
            deselectShowtime={() => setSelectedShowtime()}
            selectedMovie={selectedMovie}
            selectedShowtime={selectedShowtime}
          />
          <div className="w-full text-center">
            <button
              onClick={addStudioMoviesShowtimeMutation.mutate}
              className="w-3/6 rounded-md bg-slate-900 p-2 font-poppins text-sm text-white lg:w-2/6"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { addStudioMoviesShowtime } from "@/components/reactQuery/mutations/Cinema/addStudioMoviesShowtime";

import { AvailableMovies } from "./components/AvailableMovies";
import { AvailableShowtimes } from "./components/AvailableShowtimes";
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
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <AdminHeader withBackButton>Add Movies</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <AvailableMovies selectMovie={setSelectedMovie} />
          <AvailableShowtimes selectShowtime={setSelectedShowtime} />
          <SelectedMoviesAndShowtimes
            deselectMovie={() => setSelectedMovie()}
            deselectShowtime={() => setSelectedShowtime()}
            selectedMovie={selectedMovie}
            selectedShowtime={selectedShowtime}
          />
          <div className="mt-4 text-center">
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

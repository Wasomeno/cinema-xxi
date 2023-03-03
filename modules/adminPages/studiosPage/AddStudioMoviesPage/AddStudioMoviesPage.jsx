import { useSelectDeselect, useSelectMovies } from "hooks/useSelectDeselect";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import { AvailableMovies } from "./components/AvailableMovies";
import { AvailableShowtimes } from "./components/AvailableShowtimes";
import { SelectedMoviesAndShowtimes } from "./components/SelectedMoviesAndShowtimes";

export const AddStudioMoviesPage = () => {
  const [selectedMovies, selectMovie, deselectMovie] = useSelectMovies([]);
  const [selectedShowtimes, selectShowtime, deselectShowtime] =
    useSelectDeselect([]);
  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <AdminHeader withBackButton>Add Movies</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <AvailableMovies selectMovie={selectMovie} />
          <AvailableShowtimes selectShowtime={selectShowtime} />
          <SelectedMoviesAndShowtimes
            deselectMovie={deselectMovie}
            deselectShowtime={deselectShowtime}
            selectedMovies={selectedMovies}
            selectedShowtimes={selectedShowtimes}
          />
          <div className="mt-4 text-center">
            <button
              onClick={() => addMoviesToStudio()}
              className="font-poppins w-3/6 rounded-md bg-slate-900 p-2 text-sm text-white lg:w-2/6"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

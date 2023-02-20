import { useSelectDeselect } from "hooks/useSelectDeselect";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import AvailableMovies from "./components/AvailableMovies";
import SelectedMovies from "./components/SelectedMovies";

export const AdminAddMoviesPage = () => {
  const [selectedMovies, selectMovie, deselectMovie] = useSelectDeselect([]);
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader withBackButton>Add Movies</AdminHeader>
      <div className="mt-4 flex justify-center">
        <AvailableMovies
          selectedMovies={selectedMovies}
          selectMovie={selectMovie}
        />
      </div>
      <div className="mt-2 flex justify-center">
        <SelectedMovies
          selectedMovies={selectedMovies}
          deselectMovie={deselectMovie}
        />
      </div>
      <div className="mt-2 text-center">
        <button
          onClick={() => console.log("clicked")}
          className="font-poppins w-2/6 rounded-lg bg-slate-900 p-2 text-sm text-white"
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

import AdminHeader from "@/components/Admin/AdminHeader";
import AvailableMovies from "modules/adminPages/moviesPage/AvailableMovies";
import SelectedMovies from "modules/adminPages/moviesPage/SelectedMovies";
import AnimatedContainer from "@/components/AnimatedContainer";
import { addCinemaMovies } from "@/components/reactQuery/mutations/Cinema/addCinemaMovies";
import React, { useState } from "react";

const AddMovie = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const addMoviesToCinema = addCinemaMovies({
    region: 1,
    cinema: 1,
    movies: selectedMovies,
  });

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader title="Add Movie in Cinema" withBackButton />
      <div className="mt-4">
        <AvailableMovies
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
      </div>
      <div className="mt-2">
        <SelectedMovies
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
      </div>
      <div className="mt-2 text-center">
        <button
          onClick={() => addMoviesToCinema()}
          className="w-2/6 p-2 bg-slate-900 text-white font-poppins rounded-lg text-sm"
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

export default AddMovie;

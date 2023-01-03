import AdminHeader from "@/components/Admin/AdminHeader";
import MoviesInCinemaMenu from "modules/adminPages/moviesPage/MoviesInCinemaMenu";
import React from "react";
import MoviesInCinema from "modules/adminPages/moviesPage/MoviesInCinema";
import AnimatedContainer from "../../../components/AnimatedContainer";

const Movies = () => {
  return (
    <AnimatedContainer className="w-screen h-5/6 p-4">
      <AdminHeader
        title="Movies in Cinema"
        withOption
        OptionMenu={MoviesInCinemaMenu}
      />
      <div className="flex justify-center items-center h-full w-full flex-wrap gap-2">
        <MoviesInCinema region={1} cinema={1} />
      </div>
    </AnimatedContainer>
  );
};

export default Movies;

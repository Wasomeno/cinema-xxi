import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import MoviesInCinema from "./components/MoviesInCinema";

export const AdminMoviesPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Movies in Cinema</AdminHeader>
      <div className="flex justify-center">
        <MoviesInCinema region={1} cinema={1} />
      </div>
    </AnimatedContainer>
  );
};

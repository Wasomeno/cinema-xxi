import React from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../components/Manager/ManagerDashboardHeader";
import MovieListCard from "../../../components/Manager/Movies/MovieListCard";
import MoviesManagerMenu from "../../../components/Manager/Movies/MoviesManagerMenu";
import { useAllMovies } from "../../../components/reactQuery/queries/Movie/useAllMovies";

export const getServerSideProps = async () => {
  const movies = await useAllMovies();
  return { props: { movies: movies } };
};

const ManageMovies = ({ movies }) => {
  return (
    <AnimatedContainer className="w-full h-full p-4">
      <ManagerDashboardHeader
        title="Manage Movies"
        withOption
        OptionMenu={MoviesManagerMenu}
      />
      <div className="">List of Movies</div>
      <div className="flex flex-col gap-4 justify-start items-center">
        {movies.length < 1 ? (
          <p className="font-poppins text-sm">No movies</p>
        ) : (
          movies.map((movie) => <MovieListCard movie={movie} />)
        )}
      </div>
    </AnimatedContainer>
  );
};

export default ManageMovies;

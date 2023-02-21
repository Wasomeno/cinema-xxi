import useToggle from "hooks/useToggle";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import EllipsisVertical from "@/components/Icons/EllipsisVertical";
import MovieListCard from "@/components/MovieListCard";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import { Paragraph, Subtitle } from "@/components/shared/Texts";

import ManagerMoviesManagerMenu from "./components/ManagerMoviesMenu";

export const ManagerMoviesPage = () => {
  const allMovies = useAllMovies();
  const [showMenu, toggleShowMenu] = useToggle();
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <div className="my-2 flex items-center justify-between">
            <div className="w-2/6">
              <Subtitle size="xs">List of Movies</Subtitle>
            </div>
            <div className="relative">
              <button
                className=" h-8 w-8 rounded-full bg-slate-100 shadow-md"
                onClick={toggleShowMenu}
              >
                <EllipsisVertical />
              </button>
              {showMenu && <ManagerMoviesManagerMenu />}
            </div>
          </div>
          <div className="my-1 mb-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
            <p className="font-poppins w-2/12 text-center text-xs text-slate-500 lg:w-1/12">
              Id
            </p>
            <p className="font-poppins hidden w-3/12 text-center text-xs text-slate-500">
              Picture
            </p>
            <p className="font-poppins w-4/12 text-center text-xs text-slate-500 lg:w-3/12">
              Name
            </p>
            <p className="font-poppins w-3/12 text-center text-xs text-slate-500 lg:w-2/12">
              Added On
            </p>
          </div>
          <DataContainer
            className="flex flex-col items-center justify-start gap-4"
            loading={allMovies.isLoading}
            object="movies"
          >
            {allMovies.data?.length < 1 ? (
              <Paragraph text="No movies" size="sm" />
            ) : (
              allMovies.data?.map((movie, index) => (
                <MovieListCard key={index} movieTitle={movie.title} />
              ))
            )}
          </DataContainer>
        </div>
      </div>
    </AnimatedContainer>
  );
};

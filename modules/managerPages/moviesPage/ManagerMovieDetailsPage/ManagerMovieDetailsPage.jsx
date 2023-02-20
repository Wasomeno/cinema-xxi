import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { useMovieDetails } from "@/components/reactQuery/queries/Movie/useMovieDetails";
import { Subtitle } from "@/components/shared/Texts";

import DeleteMovieModal from "./components/ManagerDeleteMovieModal";
import MovieDetailsMenu from "./components/ManagerMovieDetailsMenu";

export const ManagerMovieDetailsPage = () => {
  const { movieId } = useRouter().query;
  const [showModal, setShowModal] = useState(false);
  const movieDetails = useMovieDetails({ movieId: movieId });
  return (
    <>
      <AnimatedContainer className="relative p-4">
        <ManagerDashboardHeader
          title="Movie Details"
          withBackButton
          withOption
          OptionMenu={
            <MovieDetailsMenu
              toggleModal={() => setShowModal((currentState) => !currentState)}
            />
          }
        />
        <div className="mx-auto my-3 h-72 w-5/6 rounded-lg bg-slate-500"></div>
        <div className="flex justify-center">
          <Subtitle text={movieDetails.data.title} size="sm" />
        </div>
      </AnimatedContainer>
      <DeleteMovieModal
        movieId={movieId}
        show={showModal}
        toggleShow={() => setShowModal((currentState) => !currentState)}
        text={movieDetails.data.title}
      />
    </>
  );
};

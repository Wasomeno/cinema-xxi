import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { useMovieDetails } from "@/components/reactQuery/queries/Movie/useMovieDetails";

export const ManagerMovieDetailsPage = () => {
  const { query } = useRouter();
  const [showModal, setShowModal] = useState(false);
  const movieDetails = useMovieDetails({ movieId: query?.movieId });

  const DeleteMovieModal = dynamic(() =>
    import("./components/ManagerDeleteMovieModal")
  );

  return (
    <>
      <AnimatedContainer className="relative h-screen overflow-y-scroll p-4">
        <ManagerHeader withBackButton>Movie Details</ManagerHeader>
        <div className="my-2 flex flex-col items-center gap-4">
          <div className="flex w-full flex-wrap items-center justify-center gap-4 lg:w-5/6">
            <div className="flex w-6/12 justify-center lg:w-3/12">
              <div className="h-60 w-full rounded-lg bg-slate-500 md:h-80 md:w-8/12 lg:w-10/12" />
            </div>
            <div className="flex w-6/12 flex-col justify-start gap-5 p-2 text-center lg:w-3/12">
              <div>
                <h5 className="font-inter hidden text-sm font-medium lg:text-base">
                  Title
                </h5>
                <p className="font-poppins text-xl lg:text-2xl">
                  {movieDetails.data?.title}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4 lg:w-4/6">
            <div className="p-2">
              <h5 className="font-inter text-sm font-medium lg:text-base">
                Synopsis
              </h5>
              <p className="font-poppins">{movieDetails.data?.synopsis}</p>
            </div>
            <div className="p-2">
              <h5 className="font-inter text-sm font-medium lg:text-base">
                Casts
              </h5>
              {movieDetails.data?.casts.map((cast, index) => (
                <p key={index}>{cast}</p>
              ))}
            </div>
            <div className="p-2">
              <h5 className="font-inter text-sm font-medium lg:text-base">
                Statistics
              </h5>
              <p></p>
            </div>
          </div>
        </div>
      </AnimatedContainer>
      {showModal && (
        <DeleteMovieModal
          movieId={query?.movieId}
          toggleShow={() => setShowModal((currentState) => !currentState)}
          text={movieDetails.data?.name}
        />
      )}
    </>
  );
};

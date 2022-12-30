import React, { useState } from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../components/Manager/ManagerDashboardHeader";
import DeleteMovieModal from "../../../components/Manager/Movies/DeleteMovieModal";
import MovieDetailsMenu from "../../../components/Manager/Movies/MovieDetailsMenu";
import { useMovieDetails } from "../../../components/reactQuery/queries/Movie/useMovieDetails";
import { Subtitle } from "../../../components/shared/Texts";

export const getServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=100, stale-while-revalidate=150"
  );
  const { movieId } = context.query;
  const movieDetails = await useMovieDetails({ movieId: movieId });
  return {
    props: {
      movieId: movieId,
      movieDetails: movieDetails,
    },
  };
};

const MovieDetails = ({ movieId, movieDetails }) => {
  const [showModal, setShowModal] = useState();
  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader
        title="Movie Details"
        withBackButton
        withOption
        OptionMenu={() =>
          MovieDetailsMenu({
            toggleModal: () => setShowModal((currentState) => !currentState),
          })
        }
      />
      <div className="w-5/6 h-72 bg-slate-500 mx-auto rounded-lg my-3"></div>
      <div className="flex justify-center">
        <Subtitle text={movieDetails.title} />
      </div>
      <DeleteMovieModal
        movieId={movieId}
        show={showModal}
        toggleShow={() => setShowModal((currentState) => !currentState)}
        text={movieDetails.title}
      />
    </AnimatedContainer>
  );
};

export default MovieDetails;

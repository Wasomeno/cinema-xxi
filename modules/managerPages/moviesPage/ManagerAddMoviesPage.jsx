import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { addMovie } from "@/components/reactQuery/mutations/Movie/addMovie";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";
import { Paragraph } from "@/components/shared/Texts";
import { useState } from "react";

const ManagerAddMoviesPage = () => {
  const [movieId, setMovieId] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const addMovieMutation = addMovie({
    duration: duration,
    title: title,
    movieId: movieId,
  });

  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader withBackButton>Add Movie</ManagerDashboardHeader>
      <FormContainer onSubmit={addMovieMutation}>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label id="movieId" className="font-poppins text-sm ">
            Movie Id
          </label>
          <FormInput
            id="movieId"
            type="number"
            value={movieId}
            setValue={setMovieId}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label id="movieTitle" className="font-poppins text-sm">
            Movie Title
          </label>
          <FormInput
            id="movieTitle"
            type="text"
            value={title}
            setValue={setTitle}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label id="movieDuration" className="font-poppins text-sm ">
            Movie Duration
          </label>
          <FormInput
            id="movieDuration"
            type="number"
            value={duration}
            setValue={setDuration}
            width="2/6"
          />
        </div>
        <div className="mt-3 w-full text-center">
          <FormSubmit value="Submit" width="3/6" />
        </div>
      </FormContainer>
    </AnimatedContainer>
  );
};

export default ManagerAddMoviesPage;

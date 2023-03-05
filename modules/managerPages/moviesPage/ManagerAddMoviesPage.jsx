import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { addMovie } from "@/components/reactQuery/mutations/Movie/addMovie";
import {
  FormContainer,
  FormInput,
  FormSubmit,
  FormTextArea,
} from "@/components/shared/Forms";

const ManagerAddMoviesPage = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cast, setCast] = useState("");

  const addMovieMutation = addMovie({
    synopsis: synopsis,
    cast: cast.split(","),
    duration: duration,
    title: title,
  });

  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerDashboardHeader withBackButton>Add Movie</ManagerDashboardHeader>
      <FormContainer onSubmit={addMovieMutation.mutate}>
        <div className="flex w-full flex-col items-center justify-center gap-2 lg:w-4/6">
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

        <div className="flex w-full flex-col items-center justify-center gap-2 lg:w-3/6">
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
        <div className="flex w-full flex-col items-center justify-center gap-2 lg:w-4/6">
          <label id="movieSynopsis" className="font-poppins text-sm ">
            Synopsis
          </label>
          <FormTextArea
            id="movieSynopsis"
            value={synopsis}
            setValue={setSynopsis}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 lg:w-4/6">
          <label id="movieCast" className="font-poppins text-sm ">
            Cast
          </label>
          <FormTextArea id="movieCast" value={cast} setValue={setCast} />
        </div>
        <div className="mt-3 w-full text-center lg:lg:w-4/6">
          <FormSubmit value="Submit" width="3/6" />
        </div>
      </FormContainer>
    </AnimatedContainer>
  );
};

export default ManagerAddMoviesPage;

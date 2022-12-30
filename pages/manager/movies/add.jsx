import React, { useState } from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../components/Manager/ManagerDashboardHeader";
import { addMovie } from "../../../components/reactQuery/mutations/Movie/addMovie";
import { Paragraph } from "../../../components/shared/Texts";

const AddMovie = () => {
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
      <ManagerDashboardHeader title="Add Movie" withBackButton />
      <form onSubmit={(event) => addMovieMutation(event)}>
        <div className="w-full text-center mt-3">
          <Paragraph text="Movie Id" size="sm" style="medium" margin="2" />
          <input
            type="number"
            value={movieId}
            className="w-3/6 h-8 p-2 text-center border border-slate-300 rounded-lg text-sm"
            onChange={(event) => setMovieId(event.target.value)}
          />
        </div>
        <div className="w-full text-center mt-3">
          <Paragraph text="Title" size="sm" style="medium" margin="2" />
          <input
            type="text"
            value={title}
            className="w-3/6 h-8 p-2 text-center border border-slate-300 rounded-lg text-sm"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="w-full text-center mt-3">
          <Paragraph text="Duration" size="sm" style="medium" margin="2" />
          <div className="flex justify-center gap-4 items-center">
            <input
              type="number"
              value={duration}
              className="w-1/6 h-8 p-2 text-center border border-slate-300 rounded-lg text-sm"
              onChange={(event) => setDuration(event.target.value)}
            />
            <div className="">
              <Paragraph text="Minutes" size="xs" />
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-4">
          <input
            type="submit"
            value="Submit"
            className="w-3/6 h-8 bg-slate-900 text-white font-poppins text-sm rounded-md"
          />
        </div>
      </form>
    </AnimatedContainer>
  );
};

export default AddMovie;

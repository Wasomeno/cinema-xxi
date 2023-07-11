import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { movieQueryKeys } from "@/components/reactQuery/queries/queryKeys/movieQueryKeys";

export const EditMovieModal = ({ closeModal, movieDetails }) => {
  const [title, setTitle] = useState(movieDetails.title);
  const [duration, setDuration] = useState(movieDetails.duration);
  const [synopsis, setSynopsis] = useState(movieDetails.synopsis);
  const [casts, setCasts] = useState(movieDetails.casts);

  const sideEffects = useSideEffects({
    text: "Updating movie",
    queryKeys: movieQueryKeys.allMovies,
  });

  const updateMovie = mutation({
    url: `/api/movies/${movieDetails.id}`,
    method: "PUT",
    body: {
      title,
      synopsis,
      casts,
      duration,
    },
    sideEffects,
  });

  function incrementCasts() {
    setCasts((current) => [...current, ""]);
  }

  function decrementCasts() {
    if (casts.length <= 3) return;
    setCasts((current) => current.slice(0, -1));
  }

  function onTitleChange(value) {
    setTitle(value);
  }

  function onDurationChange(value) {
    setDuration(value);
  }

  function onSynopsisChange(value) {
    setSynopsis(value);
  }

  function onCastsChange(index, value) {
    setCasts((current) =>
      current.map((cast, castIndex) => (castIndex === index ? value : cast))
    );
  }

  return (
    <FormModalContainer
      title="Edit Movie"
      onSubmit={updateMovie.mutate}
      closeModal={closeModal}
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm tracking-wider">Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          className="rounded-md border border-slate-600 bg-transparent p-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm tracking-wider">Duration</label>
        <div className="">
          <input
            type="number"
            placeholder="0"
            value={duration}
            onChange={(event) => onDurationChange(event.target.value)}
            className="w-20 rounded-md border border-slate-600 bg-transparent p-1 text-sm"
          />
          <span className="mx-2 text-sm">minutes</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm tracking-wider">Synopsis</label>
        <textarea
          className="h-40 rounded-md border border-slate-600 bg-transparent p-2 tracking-wide"
          value={synopsis}
          onChange={(event) => onSynopsisChange(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm tracking-wider">Cast Amount</label>
        <div className="flex items-center">
          <input
            type="text"
            value={casts.length}
            disabled={true}
            className="w-20 rounded-md border border-slate-600 bg-transparent p-1 text-center"
          />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={incrementCasts}
              className="rounded-lg bg-slate-700 p-1"
            >
              <FiChevronUp />
            </button>
            <button
              type="button"
              onClick={decrementCasts}
              className="rounded-lg bg-slate-700 p-1"
            >
              <FiChevronDown />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm tracking-wider">Casts</label>
        <div className="flex flex-wrap items-center gap-3">
          {casts.map((cast, index) => (
            <input
              key={index}
              type="text"
              value={cast}
              onChange={(event) => onCastsChange(index, event.target.value)}
              className="w-52 rounded-md border border-slate-600 bg-transparent p-1"
            />
          ))}
        </div>
      </div>
      <div className="my-3 text-center">
        <button className="h-10 w-44 rounded-lg bg-green-700 bg-opacity-75 font-poppins text-sm font-medium">
          Submit
        </button>
      </div>
    </FormModalContainer>
  );
};

import Image from "next/image";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { query } from "@/components/reactQuery/queries/query";
import { movieQueryKeys } from "@/components/reactQuery/queries/queryKeys/movieQueryKeys";

export const AddMoviesModal = ({ closeModal }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const availableMovies = query({
    url: "https://imdb-api.com/en/API/ComingSoon/k_96rtl2kc",
    queryKey: ["top250Movies"],
  });

  const sideEffects = useSideEffects({
    text: "Adding movie",
    queryKeys: movieQueryKeys.allMovies,
  });

  const addMovie = mutation({
    url: "/api/movies",
    body: {
      selectedMovies,
    },
    method: "POST",
    sideEffects,
  });

  function selectMovie(movie) {
    if (selectedMovies.some((selectedMovie) => selectedMovie.id === movie.id))
      return;

    setSelectedMovies((current) => [
      ...current,
      { id: movie.id, title: movie.title, image_url: movie.image },
    ]);
  }

  function deselectMovie(id) {
    setSelectedMovies((current) => current.filter((movie) => movie.id !== id));
  }

  console.log(selectedMovies);

  return (
    <FormModalContainer
      title="Add Movie"
      onSubmit={addMovie.mutate}
      closeModal={closeModal}
    >
      <div className="grid grid-cols-3 gap-2 overflow-y-scroll">
        {availableMovies.data?.items.map((movie) => (
          <div
            onClick={() =>
              selectedMovies.some(
                (selectedMovie) => selectedMovie.id === movie.id
              )
                ? deselectMovie(movie.id)
                : selectMovie(movie)
            }
            key={movie.id}
            className="col-span-1 flex cursor-pointer flex-col items-center gap-1.5 p-2"
          >
            <Image
              src={movie.image}
              alt="movie-image"
              width={120}
              height={240}
            />
            {movie.title}
          </div>
        ))}
      </div>
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

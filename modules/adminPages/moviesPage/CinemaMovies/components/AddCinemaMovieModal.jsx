import { useSession } from "next-auth/react";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { useAllMovies } from "@/components/reactQuery/queries/Movie/useAllMovies";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const AddCinemaMovieModal = ({ closeModal }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const allMovies = useAllMovies();

  const session = useSession();
  const sideEffects = useSideEffects({
    text: "Adding Cinema Movies",
    queryKeys: cinemaQueryKeys.cinemaMovies(session.data?.user.cinemaId),
  });

  const addCinemaMovies = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/movies`,
    method: "POST",
    body: {
      movieIds: selectedMovies.map((id) => ({ id })),
    },
    sideEffects,
  });

  return (
    <FormModalContainer
      onSubmit={addCinemaMovies.mutate}
      title="Add Movies"
      closeModal={closeModal}
    >
      <div>
        <span className="font-poppins text-xs lg:text-sm">
          Available Movies
        </span>
      </div>
      <div className="flex h-5/6 flex-col gap-2">
        {allMovies.isLoading
          ? ["dummy", "dummy", "dummy"].map((dummy, index) => (
              <span
                key={index}
                className="h-10 w-full animate-pulse rounded-lg bg-slate-300 lg:h-12"
              />
            ))
          : allMovies.data?.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  if (selectedMovies.includes(movie.id)) {
                    setSelectedMovies((current) =>
                      current.filter((movieId) => movieId !== movie.id)
                    );
                  } else {
                    setSelectedMovies((current) => [...current, movie.id]);
                  }
                }}
                className="relative flex w-full cursor-pointer items-center justify-center rounded-lg border bg-slate-50 p-3 shadow-sm"
              >
                {selectedMovies.includes(movie.id) && (
                  <span className="absolute left-10">
                    <HiCheckCircle className="text-green-600" size="25" />
                  </span>
                )}
                <span className="text-center text-xs tracking-wide lg:text-sm">
                  {movie.title}
                </span>
              </div>
            ))}
      </div>
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

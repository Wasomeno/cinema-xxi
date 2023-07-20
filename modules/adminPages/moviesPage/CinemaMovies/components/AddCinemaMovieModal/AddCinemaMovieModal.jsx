import { useSession } from "next-auth/react";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

import { AvailableMovieList } from "./AvailableMovieList";

export const AddCinemaMovieModal = ({ closeModal }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);

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
      <AvailableMovieList
        selectedMovies={selectedMovies}
        selectMovie={(movieId) =>
          setSelectedMovies((current) => [...current, movieId])
        }
        deselectMovie={(movieId) =>
          setSelectedMovies((current) =>
            current.filter((selectedMovieId) => selectedMovieId !== movieId)
          )
        }
      />
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

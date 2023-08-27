import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { CenteredModal, ModalHeader } from "@/components/Modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"

import { CinemaMovieSelectableList } from "./CinemaMovieSelectableList"
import { CinemaShowtimeSelectableList } from "./CinemaShowtimeSelectableList"

export const AddStudioShowtimeModal = ({ closeModal }) => {
  const [selectedMovie, setSelectedMovie] = useState(0)
  const [selectedShowtime, setSelectedShowtime] = useState(0)

  const { data: sessionData } = useSession()
  const { query: urlQuery } = useRouter()

  const sideEffects = useSideEffects({
    text: "Adding Studio Showtime",
    queryKeys: ["studioShowtimes", urlQuery.studioId],
  })

  const addStudioShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/studios/${urlQuery.studioId}/showtimes`,
    method: "POST",
    body: { showtimeId: selectedShowtime, movieId: selectedMovie },
    sideEffects,
  })

  return (
    <CenteredModal
      closeModal={closeModal}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-5/6 lg:w-4/6"
    >
      <ModalHeader
        title="Add Studio Showtime"
        closeModal={closeModal}
        className="mb-4"
      />
      <div className="relative flex h-5/6 w-full snap-x snap-proximity justify-start gap-4 overflow-x-scroll lg:justify-center">
        <CinemaMovieSelectableList
          cinemaId={sessionData?.user.cinemaId}
          selectMovie={(movieId) => setSelectedMovie(movieId)}
          selectedMovie={selectedMovie}
        />
        <CinemaShowtimeSelectableList
          cinemaId={sessionData?.user.cinemaId}
          selectShowtime={(showtimeId) => setSelectedShowtime(showtimeId)}
          selectedShowtime={selectedShowtime}
        />
      </div>
      <div className="mt-4 text-center">
        <button
          disabled={!selectedMovie || !selectedShowtime}
          onClick={() => {
            closeModal()
            addStudioShowtime.mutate()
          }}
          className="w-4/6 rounded-lg border py-2 font-poppins text-sm shadow-sm disabled:opacity-50 dark:border-slate-600"
        >
          Submit
        </button>
      </div>
    </CenteredModal>
  )
}

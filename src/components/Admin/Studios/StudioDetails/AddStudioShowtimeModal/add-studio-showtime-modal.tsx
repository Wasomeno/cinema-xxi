import { useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"

import { CinemaMovieSelectableList } from "./cinema-movie-selectable-list"
import { CinemaShowtimeSelectableList } from "./cinema-showtime-selectable-list"

export const AddStudioShowtimeModal = () => {
  const [selectedMovie, setSelectedMovie] = useState("")
  const [selectedShowtime, setSelectedShowtime] = useState(0)

  const { data: sessionData } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const sideEffects = useSideEffects({
    text: "Adding Studio Showtime",
    queryKeys: ["studioShowtimes", params.studioId as string],
  })

  const addStudioShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/studios/${params.studioId}/showtimes`,
    method: "POST",
    body: { showtimeId: selectedShowtime, movieId: selectedMovie },
    sideEffects,
  })

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-5/6 lg:w-4/6"
    >
      <ModalHeader
        title="Add Studio Showtime"
        closeModal={() => router.replace(pathname)}
        className="mb-4"
      />
      <div className="relative flex h-5/6 w-full snap-x snap-proximity justify-start gap-4 overflow-x-scroll lg:justify-center">
        <CinemaMovieSelectableList
          cinemaId={sessionData?.user.cinema?.id as number}
          selectMovie={(movieId) => setSelectedMovie(movieId)}
          selectedMovie={selectedMovie}
        />
        <CinemaShowtimeSelectableList
          cinemaId={sessionData?.user.cinema?.id as number}
          selectShowtime={(showtimeId) => setSelectedShowtime(showtimeId)}
          selectedShowtime={selectedShowtime}
        />
      </div>
      <div className="mt-4 text-center">
        <button
          disabled={!selectedMovie || !selectedShowtime}
          onClick={() => {
            router.replace(pathname)
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

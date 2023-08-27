import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { IoCheckmarkCircle } from "react-icons/io5"

import { CenteredModal, ModalHeader } from "@/components/Modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { query } from "@/components/reactQuery/queries/query"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export const EditStudioShowtimeModal = ({ closeModal }) => {
  const [selectedMovie, setSelectedMovie] = useState(0)
  const [selectedShowtime, setSelectedShowtime] = useState(0)

  const { data: sessionData } = useSession()
  const router = useRouter()

  const selectedStudioShowtime = query({
    queryKey: cinemaStudioQueryKeys.studioShowtimes(
      router.query.studioId,
      sessionData.user.cinemaId
    ),
    url: `/api/cinemas/${sessionData.user.cinemaId}/studios/${router.query.studioId}/showtimes/${router.query.id}`,
  })

  const cinemaShowtimes = query({
    queryKey: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinemaId),
    url: "/api/cinemas/" + sessionData?.user.cinemaId + "/showtimes",
    enabledCondition: sessionData?.user !== undefined,
  })

  const cinemaMovies = query({
    queryKey: cinemaQueryKeys.cinemaMovies(sessionData?.user.cinemaId),
    url: "/api/cinemas/" + sessionData?.user.cinemaId + "/movies",
    enabledCondition: sessionData?.user.cinemaId !== undefined,
  })

  const sideEffects = useSideEffects({
    text: "Updating Studio Showtime",
    queryKeys: ["studioShowtimes", router.query.studioId],
  })

  const updateStudioShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/studios/${router.query.studioId}/showtimes/${router.query.id}`,
    method: "PATCH",
    body: { showtimeId: selectedShowtime, movieId: selectedMovie },
    sideEffects,
  })

  useEffect(() => {
    if (!selectedStudioShowtime.isLoading) {
      setSelectedMovie(selectedStudioShowtime.data.movie_id)
      setSelectedShowtime(selectedStudioShowtime.data.showtime_id)
    }
  }, [selectedStudioShowtime.status])

  if (cinemaMovies.isLoading) return
  return (
    <CenteredModal
      closeModal={closeModal}
      className="h-5/6  bg-slate-50 px-6 py-4  dark:bg-slate-900 lg:h-5/6 lg:w-4/6"
    >
      <ModalHeader
        title="Edit Studio Showtime"
        closeModal={closeModal}
        className="mb-4"
      />
      <div className="relative flex h-5/6 w-full snap-x snap-proximity justify-start gap-4 overflow-x-scroll lg:justify-center">
        <div className="flex flex-1 snap-center flex-col gap-1.5">
          <h5 className="text-sm">Select movie</h5>
          <div className="flex h-full w-80 flex-col rounded-lg border bg-slate-50 dark:border-slate-600 dark:bg-slate-800 lg:w-full">
            {cinemaMovies.data.map((movie) => (
              <button
                onClick={() => setSelectedMovie(movie.id)}
                key={movie.id}
                className="relative border-b p-2 text-sm dark:border-b-slate-700"
              >
                {selectedMovie === movie.id && (
                  <span className="absolute left-5 top-1/2 -translate-y-1/2">
                    <IoCheckmarkCircle size="16" className="text-green-600" />
                  </span>
                )}
                {movie.title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex snap-center flex-col gap-1.5 lg:flex-1">
          <h5 className="text-sm">Select Showtime</h5>
          <div className="flex h-full w-80 flex-col rounded-lg border bg-slate-50 dark:border-slate-600 dark:bg-slate-800 lg:w-full">
            {cinemaShowtimes.data.map((showtime) => (
              <button
                onClick={() => setSelectedShowtime(showtime.id)}
                key={showtime.id}
                className="relative border-b p-2 text-sm dark:border-b-slate-700"
              >
                {selectedShowtime === showtime.id && (
                  <span className="absolute left-5 top-1/2 -translate-y-1/2">
                    <IoCheckmarkCircle size="16" className="text-green-600" />
                  </span>
                )}
                {showtime.hour}:{showtime.minutes}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => {
            closeModal()
            updateStudioShowtime.mutate()
          }}
          className="w-4/6 rounded-lg border py-2 font-poppins text-sm shadow-sm dark:border-slate-700"
        >
          Submit
        </button>
      </div>
    </CenteredModal>
  )
}

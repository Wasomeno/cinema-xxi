import { useState } from "react"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModal, ModalHeader } from "@/components/Modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const AddCinemaShowtimeModal = ({ closeModal }) => {
  const [hour, setHour] = useState(12)
  const [minutes, setMinutes] = useState(0)

  const { data: sessionData } = useSession()

  const sideEffects = useSideEffects({
    text: "Adding Showtimes",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinemaId),
  })

  const addCinemaShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/showtimes`,
    method: "POST",
    body: {
      hour,
      minutes,
    },
    sideEffects,
  })

  function hourHandler(value) {
    if (value >= 22) return
    setHour(value)
  }

  function minutesHandler(value) {
    if (value < 0 || value >= 59) return
    setMinutes(value)
  }

  return (
    <CenteredModal
      closeModal={closeModal}
      className="flex h-3/6 flex-col justify-center bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Showtime"
        className="mb-4"
        closeModal={closeModal}
      />
      <Form
        onSubmit={() => {
          closeModal()
          addCinemaShowtime.mutate()
        }}
        className="flex flex-1 flex-col items-center justify-between gap-4 overflow-y-scroll"
      >
        <div className="flex h-5/6 items-center justify-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs lg:text-sm">Hour</span>
            <input
              type="number"
              value={hour}
              onChange={(event) => hourHandler(event.target.value)}
              className="h-10 w-full rounded-lg border text-center text-lg shadow-sm lg:h-14 lg:w-5/6"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs lg:text-sm">Minutes</span>
            <input
              type="number"
              value={minutes}
              onChange={(event) => minutesHandler(event.target.value)}
              className="h-10 w-full rounded-lg border text-center text-lg shadow-sm lg:h-14 lg:w-5/6"
            />
          </div>
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const AddCinemaShowtimeModal = () => {
  const [hour, setHour] = useState(12)
  const [minutes, setMinutes] = useState(0)

  const { data: sessionData } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const sideEffects = useSideEffects({
    text: "Adding Showtimes",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinema?.id),
  })

  const addCinemaShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/showtimes`,
    method: "POST",
    body: {
      hour,
      minutes,
    },
    sideEffects,
  })

  function hourHandler(value: string) {
    const valueToInteger = parseInt(value)
    if (valueToInteger >= 22) return
    setHour(valueToInteger)
  }

  function minutesHandler(value: string) {
    const valueToInteger = parseInt(value)
    if (valueToInteger < 0 || valueToInteger >= 59) return
    setMinutes(valueToInteger)
  }

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="flex h-3/6 flex-col justify-center bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Showtime"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
      <Form
        onSubmit={() => {
          router.replace(pathname)
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

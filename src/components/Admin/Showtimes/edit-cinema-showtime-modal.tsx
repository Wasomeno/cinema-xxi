import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Showtime } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export function EditCinemaShowtimeModal() {
  const router = useRouter()
  const { data: sessionData } = useSession()
  const showtime = useQuery<Showtime>(["showtime", router.query?.id], () =>
    fetch(
      `/api/cinemas/${sessionData?.user.cinema?.id}/showtimes/${router.query?.id}`
    ).then((result) => result.json())
  )

  const [hour, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const sideEffects = useSideEffects({
    text: "Updating showtime",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinema?.id),
  })

  const updateShowtimeMutation = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/showtimes`,
    method: "PUT",
    body: {
      id: router.query.id,
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

  useEffect(() => {
    if (!showtime.isLoading) {
      setHour(showtime.data?.hour as number)
      setMinutes(showtime.data?.minutes as number)
    }
  }, [showtime.isLoading])

  return (
    <CenteredModal
      closeModal={() => router.push("/admin/showtimes")}
      className="flex h-3/6 flex-col justify-center bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
    >
      <ModalHeader
        title="Edit Showtime"
        className="mb-4"
        closeModal={() => router.push("/admin/showtimes")}
      />
      <Form
        onSubmit={() => {
          router.push("/admin/showtimes")
          updateShowtimeMutation.mutate()
        }}
        className="flex flex-1 flex-col items-center justify-between gap-4 overflow-y-scroll"
      >
        <div className="flex h-5/6 items-center justify-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">Hour</span>
            <input
              type="number"
              value={hour}
              onChange={(event) => hourHandler(event.target.value)}
              className="h-14 w-full rounded-lg border text-center text-lg shadow-sm dark:border-slate-600 lg:w-5/6"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">Minutes</span>
            <input
              type="number"
              value={minutes}
              onChange={(event) => minutesHandler(event.target.value)}
              className="h-14 w-full rounded-lg border text-center text-lg shadow-sm dark:border-slate-600 lg:w-5/6"
            />
          </div>
        </div>

        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

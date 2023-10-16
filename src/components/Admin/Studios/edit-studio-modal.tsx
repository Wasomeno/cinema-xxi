import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export function EditStudioModal() {
  const [studioNumber, setStudioNumber] = useState<number>()
  const [capacity, setCapacity] = useState<number>()

  const pathname = usePathname()
  const router = useRouter()
  const searhcParams = useSearchParams()
  const { data: session } = useSession()

  const studioId = searhcParams.get("id")
  const studioDetails = useQuery(["studio", studioId], () =>
    fetch(`/api/cinemas/${session?.user.cinema?.id}/studios/${studioId}`).then(
      (result) => result.json()
    )
  )

  const sideEffects = useSideEffects({
    queryKeys: cinemaStudioQueryKeys.allStudio,
    text: `Updating studio ${studioNumber}`,
  })

  const updateStudio = mutation({
    method: "PATCH",
    body: {
      studio: studioNumber,
      capacity,
    },
    url: `/api/cinemas/${session?.user.cinema?.id}/studios/${studioId}`,
    sideEffects,
  })

  useEffect(() => {
    if (!studioDetails.isLoading) {
      setStudioNumber(studioDetails.data?.studio)
      setCapacity(studioDetails.data?.capacity)
    }
  }, [studioDetails.isLoading])

  return (
    <CenteredModal
      title="Edit Studio"
      closeModal={() => router.push(pathname)}
      className="h-5/6 bg-slate-50 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title="Edit Studio"
        closeModal={() => router.push(pathname)}
        className="mb-4"
      />
      <Form
        onSubmit={() => {
          updateStudio.mutate()
          router.push(pathname)
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="space-y-2">
          <Form.Input
            type="text"
            label="Studio Number"
            value={studioNumber}
            onChange={(event) => setStudioNumber(parseInt(event.target.value))}
          />
          <Form.Input
            type="text"
            label="Capacity"
            value={capacity}
            onChange={(event) => setCapacity(parseInt(event.target.value))}
          />
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

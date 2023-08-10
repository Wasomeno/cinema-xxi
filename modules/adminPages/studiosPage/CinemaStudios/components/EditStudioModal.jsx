import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { query } from "@/components/reactQuery/queries/query"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export const EditStudioModal = () => {
  const [studioNumber, setStudioNumber] = useState()
  const [capacity, setCapacity] = useState()

  const router = useRouter()
  const { data: session } = useSession()
  const studioDetails = query({
    queryKey: ["studio", router.query.id],
    url: `/api/cinemas/${session.user.cinemaId}/studios/${router.query.id}`,
  })

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
    url: `/api/cinemas/${session.user.cinemaId}/studios/${router.query.id}`,
    sideEffects,
  })

  useEffect(() => {
    if (!studioDetails.isLoading) {
      setStudioNumber(studioDetails.data?.studio)
      setCapacity(studioDetails.data?.capacity)
    }
  }, [studioDetails.isLoading])

  return (
    <CenteredModalContainer
      title="Edit Studio"
      closeModal={() => router.push("/admin/studios")}
      className="lg:h-4/6 lg:w-2/6"
    >
      <Form
        onSubmit={() => {
          updateStudio.mutate()
          router.push("/admin/studios")
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="space-y-2">
          <Form.Input
            type="text"
            labelText="Studio Number"
            value={studioNumber}
            setValue={setStudioNumber}
          />
          <Form.Input
            type="text"
            labelText="Capacity"
            value={capacity}
            setValue={setCapacity}
          />
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModalContainer>
  )
}

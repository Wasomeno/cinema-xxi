import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { query } from "@/components/reactQuery/queries/query"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const EditRegionModal = ({ closeModal }) => {
  const [name, setName] = useState("")
  const router = useRouter()

  const sideEffects = useSideEffects({
    text: "Updating Region",
    queryKeys: regionQueryKeys.allRegion,
  })

  const region = query({
    queryKey: regionQueryKeys.regionDetails(router.query.id),
    url: `/api/regions/${router.query.id}`,
  })

  const updateRegion = mutation({
    method: "PUT",
    url: "/api/regions/" + 1,
    body: {
      name,
    },
    sideEffects,
  })

  useEffect(() => {
    if (region.isSuccess) {
      setName(region.data.name)
    }
  }, [region.isLoading])

  return (
    <CenteredModalContainer
      title="Edit Region"
      closeModal={closeModal}
      className="lg:h-3/6 lg:w-2/6"
    >
      <Form
        onSubmit={() => {
          updateRegion.mutate()
          closeModal()
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <Form.Input
          id="regionName"
          labelText="Region Name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-md border border-slate-600 bg-transparent p-1"
        />
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModalContainer>
  )
}

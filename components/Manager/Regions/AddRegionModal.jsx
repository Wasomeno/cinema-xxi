import { useState } from "react"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const AddRegionModal = ({ closeModal }) => {
  const [regionName, setRegionName] = useState("")
  const sideEffects = useSideEffects({
    text: "Adding new Region",
    queryKeys: regionQueryKeys.allRegion,
  })

  const addRegion = mutation({
    url: "/api/regions",
    body: { regionName },
    method: "POST",
    sideEffects,
  })

  return (
    <CenteredModalContainer
      title="Add Region"
      closeModal={closeModal}
      className="lg:h-3/6 lg:w-2/6"
    >
      <Form
        onSubmit={() => {
          addRegion.mutate()
          closeModal()
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <Form.Input
          type="text"
          labelText="Region Name"
          value={regionName}
          setValue={setRegionName}
        />
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModalContainer>
  )
}

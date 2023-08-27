import { useState } from "react"

import { Form } from "@/components/Forms"
import { CenteredModal, ModalHeader } from "@/components/Modal"
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
    <CenteredModal
      closeModal={closeModal}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Region"
        closeModal={closeModal}
        className="mb-4"
      />
      <Form
        onSubmit={() => {
          closeModal()
          addRegion.mutate()
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
    </CenteredModal>
  )
}

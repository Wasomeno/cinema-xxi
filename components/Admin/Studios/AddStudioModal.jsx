import { useState } from "react"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModal, ModalHeader } from "@/components/Modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export const AddStudioModal = ({ closeModal }) => {
  const [studio, setStudio] = useState("")
  const [studioCapacity, setStudioCapacity] = useState("")
  const { data: sessionData } = useSession()

  const sideEffects = useSideEffects({
    text: "Adding new studio",
    queryKeys: cinemaStudioQueryKeys.allStudio,
  })

  const addStudio = mutation({
    url: `/api/cinemas/${sessionData.user.cinemaId}/studios`,
    method: "POST",
    body: {
      studioNumber: studio,
      studioCapacity,
    },
    sideEffects: sideEffects,
  })

  return (
    <CenteredModal
      closeModal={closeModal}
      className="h-4/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Studio"
        className="mb-4"
        closeModal={closeModal}
      />
      <Form
        onSubmit={() => {
          closeModal()
          addStudio.mutate()
        }}
        className="flex w-full flex-1 flex-col items-center justify-between"
      >
        <div className="w-full space-y-2">
          <Form.Input
            type="number"
            labelText="Studio Number"
            value={studio}
            setValue={setStudio}
          />
          <Form.Input
            type="number"
            labelText="Studio Capacity"
            value={studioCapacity}
            setValue={setStudioCapacity}
          />
        </div>

        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

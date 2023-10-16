import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const AddRegionModal = () => {
  const [regionName, setRegionName] = useState("")
  const pathname = usePathname()
  const router = useRouter()
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
      closeModal={() => router.replace(pathname)}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Region"
        closeModal={() => router.replace(pathname)}
        className="mb-4"
      />
      <Form
        onSubmit={() => {
          router.replace(pathname)
          addRegion.mutate()
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <Form.Input
          type="text"
          label="Region Name"
          value={regionName}
          onChange={(event) => setRegionName(event.target.value)}
        />
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

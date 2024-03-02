"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys"

export function AddStudioModal() {
  const [studio, setStudio] = useState("")
  const [studioCapacity, setStudioCapacity] = useState("")

  const pathname = usePathname()
  const router = useRouter()
  const { data: sessionData } = useSession()

  const sideEffects = useSideEffects({
    text: "Adding new studio",
    queryKeys: cinemaStudioQueryKeys.allStudio,
  })

  const addStudio = mutation({
    url: `/api/cinemas/${sessionData?.user.cinema?.id}/studios`,
    method: "POST",
    body: {
      studioNumber: studio,
      studioCapacity,
    },
    sideEffects: sideEffects,
  })

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="h-4/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Studio"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
      <Form
        onSubmit={() => {
          router.replace(pathname)
          addStudio.mutate()
        }}
        className="flex w-full flex-1 flex-col items-center justify-between"
      >
        <div className="w-full space-y-2">
          <Form.Input
            type="number"
            label="Studio Number"
            value={studio}
            onChange={(event) => setStudio(event.target.value)}
          />
          <Form.Input
            type="number"
            label="Studio Capacity"
            value={studioCapacity}
            onChange={(event) => setStudioCapacity(event.target.value)}
          />
        </div>

        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

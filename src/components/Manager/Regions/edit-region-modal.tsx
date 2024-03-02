import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const EditRegionModal = () => {
  const [name, setName] = useState("")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const sideEffects = useSideEffects({
    text: "Updating Region",
    queryKeys: regionQueryKeys.allRegion,
  })

  const regionId = searchParams.get("id")

  const region = useQuery({
    queryKey: regionQueryKeys.regionDetails(regionId),
    queryFn: () =>
      fetch(`/api/regions/${regionId}`).then((result) => result.json()),
  })

  const updateRegion = mutation({
    method: "PUT",
    url: `/api/regions/${regionId}`,
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
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-3/6 lg:w-2/6"
    >
      <ModalHeader
        title="Edit Region"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
      <Form
        onSubmit={() => {
          updateRegion.mutate()
          router.replace(pathname)
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <Form.Input
          id="regionName"
          label="Region Name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-md border border-slate-600 bg-transparent p-1"
        />
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

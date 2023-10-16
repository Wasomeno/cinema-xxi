import { useState } from "react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const AddCinemaModal = () => {
  const [cinemaName, setCinemaName] = useState("")
  const [studioAmount, setStudioAmount] = useState(2)
  const [studioCapacities, setStudioCapacities] = useState(["", ""])

  const params = useParams()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const sideEffects = useSideEffects({
    text: "Adding New Cinema",
    queryKeys: regionQueryKeys.regionCinemas(params.regionId),
  })

  const addCinema = mutation({
    url: "/api/cinemas",
    method: "POST",
    body: {
      cinemaName,
      regionId: parseInt(params.regionId as string),
      studioDetails: studioCapacities.map((capacity, index) => ({
        studio: index + 1,
        capacity: parseInt(capacity),
      })),
    },
    sideEffects,
  })

  const onStudioAmountChange = (value: number) => {
    if (value >= 10 || value <= 0) return
    setStudioAmount(value)
    const array = new Array(value ? value : 1)
    setStudioCapacities(array.fill(""))
  }

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title={"Add Cinema"}
        closeModal={() => router.replace(pathname)}
        className="mb-4"
      />
      <Form
        onSubmit={() => {
          router.replace(pathname)
          addCinema.mutate()
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <Form.Input
            type="text"
            label="Name"
            value={cinemaName}
            onChange={(event) => setCinemaName(event?.target.value)}
          />
          <Form.Input
            type="number"
            label="Studio Amount"
            value={studioAmount}
            onChange={(event) =>
              onStudioAmountChange(parseInt(event?.target.value))
            }
            className="lg:tex-sm h-8 w-6/12 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs dark:bg-slate-700"
          />
          <div className="my-3 flex w-full flex-col items-start gap-2">
            <label
              id="studioCapacities"
              className="font-poppins text-xs md:text-sm"
            >
              Studio Capacities
            </label>
            <div className="grid grid-cols-2 items-center gap-2 lg:grid-cols-4 ">
              {studioCapacities.map((studio, index) => (
                <input
                  key={index}
                  id="studioCapacities"
                  type="number"
                  className="col-span-1 h-8 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs focus:outline-none dark:bg-slate-700 md:text-sm"
                  placeholder={"Studio " + index + 1}
                  value={studio}
                  onChange={(e) =>
                    setStudioCapacities((current) =>
                      current.map((cap, inputIndex) => {
                        if (inputIndex === index) {
                          return e.target.value
                        } else {
                          return cap
                        }
                      })
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <Form.Submit text="Submit " />
      </Form>
    </CenteredModal>
  )
}
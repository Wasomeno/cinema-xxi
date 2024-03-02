"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

const AddCinemaSchema = z.object({
  name: z.string().min(5).max(25),
  studioAmount: z.number().min(3).max(12),
})

type AddCinemaInputTypes = z.infer<typeof AddCinemaSchema>

export const AddCinemaModal = () => {
  const [studioCapacities, setStudioCapacities] = useState([0, 0])
  const { register, getValues, formState, watch, setValue } =
    useForm<AddCinemaInputTypes>({
      resolver: zodResolver(AddCinemaSchema),
      defaultValues: { name: "", studioAmount: 2 },
    })

  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const sideEffects = useSideEffects({
    text: "Adding New Cinema",
    queryKeys: regionQueryKeys.regionCinemas(params.regionId),
  })

  const addCinema = mutation({
    url: "/api/cinemas",
    method: "POST",
    body: {
      cinema: {
        name: getValues("name"),
        regionId: params.regionId,
        studios: studioCapacities.map((capacity, index) => ({
          number: index + 1,
          capacity: capacity,
        })),
      },
    },
    sideEffects,
  })

  function onStudioAmountChange(
    event: SyntheticEvent<HTMLInputElement, InputEvent>
  ) {
    const parsedValue = parseInt(event.currentTarget.value)
    if (parsedValue >= 10 || Number.isNaN(parsedValue)) return
    setValue("studioAmount", parsedValue)
  }

  function onStudioCapacityChange(studioIndex: number, value: string) {
    if (parseInt(value) >= 100) return
    setStudioCapacities((current) =>
      current.map((cap, inputIndex) => {
        if (inputIndex === studioIndex) {
          return Number.isNaN(parseInt(value)) ? 0 : parseInt(value)
        } else {
          return cap
        }
      })
    )
  }

  useEffect(() => {
    const watchStudioAmount = watch(({ studioAmount }) => {
      const array = new Array(studioAmount ? studioAmount : 1)
      setStudioCapacities(array.fill(0))
    })
    return () => {
      watchStudioAmount.unsubscribe()
    }
  }, [watch])

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
            {...register("name")}
            label="Name"
            placeholder="Cinema Name"
            className="lg:tex-sm h-8 w-full rounded-lg border border-slate-400 p-2 text-start font-poppins text-xs dark:bg-slate-700"
          />
          <Form.Input
            {...register("studioAmount", { onChange: onStudioAmountChange })}
            label="Studio Amount"
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
              {studioCapacities.map((capacity, index) => (
                <input
                  key={index}
                  id="studioCapacities"
                  className="col-span-1 h-8 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs focus:outline-none dark:bg-slate-700 md:text-sm"
                  placeholder={"Studio " + index + 1}
                  value={capacity}
                  onChange={(event) =>
                    onStudioCapacityChange(index, event.currentTarget.value)
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

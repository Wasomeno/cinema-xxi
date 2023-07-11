import { useRouter } from "next/router";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";

export const AddCinemaModal = ({ closeModal }) => {
  const { regionId } = useRouter().query;
  const [cinemaName, setCinemaName] = useState("");
  const [studioAmount, setStudioAmount] = useState(2);
  const [studioCapacities, setStudioCapacities] = useState(["", ""]);

  const sideEffects = useSideEffects({
    text: "Adding New Cinema",
    queryKeys: regionQueryKeys.regionCinemas(regionId),
  });

  const addCinema = mutation({
    url: "/api/cinemas",
    method: "POST",
    body: {
      cinemaName,
      regionId: parseInt(regionId),
      studioDetails: studioCapacities.map((capacity, index) => ({
        studio: parseInt(index + 1),
        capacity: parseInt(capacity),
      })),
    },
    sideEffects,
  });

  const decrementStudioAmount = () => {
    if (studioAmount <= 2) return;
    setStudioAmount((currentAmount) => currentAmount - 1);
    setStudioCapacities((currentAmount) =>
      currentAmount.filter((studio, index) => {
        return index !== studioAmount - 1;
      })
    );
  };

  const incrementStudioAmount = () => {
    if (studioAmount >= 10) return;
    setStudioAmount((currentAmount) => currentAmount + 1);
    setStudioCapacities((currentAmount) => [...currentAmount, ""]);
  };

  return (
    <FormModalContainer
      title="Add Cinema"
      onSubmit={addCinema.mutate}
      closeModal={closeModal}
    >
      <FormModalContainer.Input
        labelText="Name"
        value={cinemaName}
        setValue={setCinemaName}
      />
      <div className="flex w-5/12 flex-col justify-center gap-1">
        <label id="studioAmount" className="font-poppins text-sm lg:text-sm">
          Studio Amount
        </label>
        <div className="flex items-center gap-1">
          <input
            disabled
            type="number"
            value={studioAmount}
            readOnly={true}
            className="lg:tex-sm h-8 w-6/12 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs dark:bg-slate-700"
          />
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              className="rounded-lg bg-slate-700 p-1.5"
              onClick={incrementStudioAmount}
            >
              <HiChevronUp size="16" />
            </button>

            <button
              type="button"
              className="rounded-lg bg-slate-700 p-1.5"
              onClick={decrementStudioAmount}
            >
              <HiChevronDown size="16" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 flex w-full flex-col items-start gap-2 lg:w-4/6">
        <label
          id="studioCapacities"
          className="font-poppins text-xs md:text-sm"
        >
          Studio Capacities
        </label>
        <div className="grid grid-cols-2 items-center gap-2 lg:grid-cols-4">
          {studioCapacities.map((studio, index) => (
            <input
              key={index}
              id="studioCapacities"
              type="number"
              className="col-span-1 h-8 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs focus:outline-none dark:bg-slate-700 md:text-sm"
              placeholder={"Studio " + parseInt(index + 1)}
              value={studio}
              onChange={(e) =>
                setStudioCapacities((current) =>
                  current.map((cap, inputIndex) => {
                    if (inputIndex === index) {
                      return e.target.value;
                    } else {
                      return cap;
                    }
                  })
                )
              }
            />
          ))}
        </div>
      </div>
      <FormModalContainer.Submit text="Submit " />
    </FormModalContainer>
  );
};

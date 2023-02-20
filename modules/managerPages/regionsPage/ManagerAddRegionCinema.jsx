import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import ChevronLeft from "@/components/Icons/ChevronLeft";
import ChevronRight from "@/components/Icons/ChevronRight";
import { addCinema } from "@/components/reactQuery/mutations/Cinema/addCinema";
import { Paragraph } from "@/components/shared/Texts";

const ManagerAddRegionCinema = () => {
  const { regionId } = useRouter().query;
  const [cinemaId, setCinemaId] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [studioAmount, setStudioAmount] = useState(2);
  const [studioCapacities, setStudioCapacities] = useState(["", ""]);

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
    <AnimatedContainer className="flex w-full flex-col items-center justify-center p-4">
      <ManagerDashboardHeader title="Add new cinema" withBackButton />
      <form
        onSubmit={(event) => console.log(event)}
        className="flex w-4/6 flex-col items-center justify-center"
      >
        <div className="m-2 flex w-full flex-col items-center justify-center">
          <Paragraph text={"Region " + regionId} size="sm" />
        </div>

        <div className="m-2 flex w-full flex-col items-center justify-center">
          <Paragraph text="Cinema Id" size="sm" style="medium" margin="3" />
          <input
            value={cinemaId}
            onChange={(event) => setCinemaId(event.target.value)}
            type="number"
            className="font-poppins h-8 w-8/12 rounded-lg border-2 border-solid border-slate-400 p-2 text-center text-sm"
          />
        </div>

        <div className="m-2 flex w-full flex-col items-center justify-center">
          <Paragraph text="Cinema Name" size="sm" style="medium" margin="3" />
          <input
            value={cinemaName}
            onChange={(event) => setCinemaName(event.target.value)}
            type="text"
            className="font-poppins h-8 w-8/12 rounded-lg border-2 border-solid border-slate-400 p-2 text-center text-sm"
          />
        </div>
        <div className="m-2 flex w-full flex-col items-center justify-center">
          <Paragraph text="Studio Amount" size="sm" style="medium" margin="3" />
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="rounded-lg bg-black p-2"
              onClick={decrementStudioAmount}
            >
              <ChevronLeft size="5" color="white" />
            </button>
            <input
              type="number"
              value={studioAmount}
              readOnly={true}
              className="font-poppins mx-2 h-8 w-4/12 rounded-lg border-2 border-solid border-slate-400 p-2 text-center text-sm"
            />
            <button
              type="button"
              className="rounded-lg bg-black p-2"
              onClick={incrementStudioAmount}
            >
              <ChevronRight size="5" color="white" />
            </button>
          </div>
        </div>
        <div className="m-2 h-2/6 w-full text-center">
          <Paragraph
            text="Studios Capacity"
            size="sm"
            style="medium"
            margin="3"
          />
          <div className="grid h-full w-full grid-cols-2 gap-2">
            {studioCapacities.map((studio, index) => (
              <input
                key={index}
                type="number"
                className="font-poppins col-span-1 h-8 rounded-lg border-2 border-solid border-slate-400 p-2 text-center text-sm"
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

        <div className="m-4 flex w-full flex-col items-center justify-center">
          <input
            type="submit"
            value="Submit"
            className="font-poppins w-10/12 rounded-lg bg-slate-900 p-2 text-center text-sm font-medium text-white"
          />
        </div>
      </form>
    </AnimatedContainer>
  );
};

export default ManagerAddRegionCinema;

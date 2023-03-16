import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import ChevronLeft from "@/components/Icons/ChevronLeft";
import ChevronRight from "@/components/Icons/ChevronRight";
import { addCinema } from "@/components/reactQuery/mutations/Cinema/addCinema";
import { FormContainer } from "@/components/shared/Forms";
import { Paragraph } from "@/components/shared/Texts";

const ManagerAddRegionCinema = () => {
  const { regionId } = useRouter().query;
  const [cinemaName, setCinemaName] = useState("");
  const [studioAmount, setStudioAmount] = useState(2);
  const [studioCapacities, setStudioCapacities] = useState(["", ""]);

  const addCinemaMutation = addCinema({
    cinemaName: cinemaName,
    studioCapacities: studioCapacities,
    regionId: regionId,
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
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader withBackButton>
        Add Cinema ({"Region " + regionId})
      </ManagerHeader>
      <div className="flex justify-center">
        <FormContainer onSubmit={addCinemaMutation.mutate}>
          <div className="m-1 flex w-full flex-col items-center justify-center gap-2">
            <Paragraph size="sm" style="medium">
              Cinema Name
            </Paragraph>
            <input
              value={cinemaName}
              onChange={(event) => setCinemaName(event.target.value)}
              type="text"
              className="h-8 w-8/12 rounded-lg border-2 border-solid border-slate-400 p-2 text-center font-poppins text-sm"
            />
          </div>
          <div className="m-1 flex w-full flex-col items-center justify-center">
            <Paragraph size="sm" style="medium" margin="1">
              Studio Amount
            </Paragraph>
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
                className="mx-2 h-8 w-4/12 rounded-lg border-2 border-solid border-slate-400 p-2 text-center font-poppins text-sm"
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
          <div className="text-center">
            <Paragraph size="sm" style="medium" margin="3">
              Studio Capacities
            </Paragraph>
            <div className="grid grid-cols-2 items-center gap-2">
              {studioCapacities.map((studio, index) => (
                <input
                  key={index}
                  type="number"
                  className="col-span-1 h-8 rounded-lg border-2 border-solid border-slate-400 p-2 text-center font-poppins text-sm"
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

          <div className="my-2 flex w-full flex-col items-center justify-center">
            <input
              type="submit"
              value="Submit"
              className="w-10/12 rounded-lg bg-slate-900 p-2 text-center font-poppins text-sm font-medium text-white"
            />
          </div>
        </FormContainer>
      </div>
    </AnimatedContainer>
  );
};

export default ManagerAddRegionCinema;

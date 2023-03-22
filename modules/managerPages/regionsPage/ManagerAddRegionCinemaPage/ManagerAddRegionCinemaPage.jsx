import { useRouter } from "next/router";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { addCinema } from "@/components/reactQuery/mutations/Cinema/addCinema";
import { FormContainer } from "@/components/shared/Forms";

import CinemaNameInput from "./components/CinemaNameInput";
import StudioAmountInput from "./components/StudioAmountInput";
import StudioCapacitiesInput from "./components/StudioCapacitiesInput";

export const ManagerAddRegionCinemaPage = () => {
  const { regionId } = useRouter().query;
  const [cinemaName, setCinemaName] = useState("");
  const [studioAmount, setStudioAmount] = useState(2);
  const [studioCapacities, setStudioCapacities] = useState(["", ""]);

  const addCinemaMutation = addCinema({
    cinemaName: cinemaName,
    studioCapacities: studioCapacities,
    regionId: regionId,
  });

  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader withBackButton>
        Add Cinema ({"Region " + regionId})
      </ManagerHeader>
      <div className="flex justify-center">
        <FormContainer onSubmit={addCinemaMutation.mutate}>
          <div className="mt-4 flex items-center justify-center gap-1">
            <CinemaNameInput
              cinemaName={cinemaName}
              setCinemaName={setCinemaName}
            />
            <StudioAmountInput
              setStudioAmount={setStudioAmount}
              studioAmount={studioAmount}
              setStudioCapacities={setStudioCapacities}
            />
          </div>
          <StudioCapacitiesInput
            setStudioCapacities={setStudioCapacities}
            studioCapacities={studioCapacities}
          />
          <div className="my-2 flex w-full flex-col items-center justify-center">
            <input
              type="submit"
              value="Submit"
              className="w-10/12 rounded-lg bg-slate-900 p-2 text-center font-poppins text-xs font-medium  text-white md:text-sm"
            />
          </div>
        </FormContainer>
      </div>
    </AnimatedContainer>
  );
};

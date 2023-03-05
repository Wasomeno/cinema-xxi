import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { addRegion } from "@/components/reactQuery/mutations/Region/addRegion";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";

const ManagerAddRegionPage = () => {
  const [regionName, setRegionName] = useState("");
  const addRegionMutation = addRegion({ regionName: regionName });

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <ManagerDashboardHeader withBackButton>Add Region</ManagerDashboardHeader>
      <FormContainer onSubmit={addRegionMutation.mutate}>
        <div className="my-4 flex w-full flex-col items-center justify-center gap-2 text-center lg:w-3/6">
          <label id="regionId" className="font-poppins text-xs lg:text-sm">
            Region Name
          </label>
          <FormInput type="text" value={regionName} setValue={setRegionName} />
        </div>
        <div className="w-5/6 text-center lg:w-3/6">
          <FormSubmit value="Submit" width="3/6" />
        </div>
      </FormContainer>
    </AnimatedContainer>
  );
};

export default ManagerAddRegionPage;

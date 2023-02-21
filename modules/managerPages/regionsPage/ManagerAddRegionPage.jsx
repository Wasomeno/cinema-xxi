import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";

const ManagerAddRegionPage = () => {
  const [regionName, setRegionName] = useState("");
  const [regionId, setRegionId] = useState("");

  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerDashboardHeader withBackButton>Add Region</ManagerDashboardHeader>
      <FormContainer onSubmit={console.log("test")}>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <label id="regionId" className="font-poppins text-xs lg:text-sm">
            Region Id
          </label>
          <FormInput
            id="regionId"
            type="number"
            value={regionId}
            setValue={setRegionId}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <label id="regionId" className="font-poppins text-xs lg:text-sm">
            Region Name
          </label>
          <FormInput type="text" value={regionName} setValue={setRegionName} />
        </div>

        <div className="w-5/6 text-center">
          <FormSubmit value="Submit" width="3/6" />
        </div>
      </FormContainer>
    </AnimatedContainer>
  );
};

export default ManagerAddRegionPage;

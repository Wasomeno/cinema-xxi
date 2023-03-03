import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { useAddStudio } from "@/components/reactQuery/mutations/Cinema/addStudio";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";

export const AddStudioPage = () => {
  const [studio, setStudio] = useState("");
  const [studioCapacity, setStudioCapacity] = useState("");
  const addStudioMutation = useAddStudio({
    capacity: studioCapacity,
    number: studio,
  });
  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <AdminHeader withBackButton>Add Studio</AdminHeader>
      <div className="my-4">
        <FormContainer onSubmit={addStudioMutation.mutate}>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <label id="studio" className="font-poppins">
              Studio Number
            </label>
            <FormInput
              id="studio"
              type="text"
              value={studio}
              setValue={setStudio}
              width="1/6"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <label id="studioCapacity" className="font-poppins">
              Studio Capacity
            </label>
            <FormInput
              id="studioCapacity"
              type="text"
              value={studioCapacity}
              setValue={setStudioCapacity}
              width="1/6"
            />
          </div>
          <div className="my-4 w-full text-center">
            <FormSubmit value="Submit" width="1/6" />
          </div>
        </FormContainer>
      </div>
    </AnimatedContainer>
  );
};

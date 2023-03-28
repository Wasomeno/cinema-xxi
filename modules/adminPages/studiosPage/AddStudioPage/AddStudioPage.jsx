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
    <AnimatedContainer className="h-screen bg-opacity-95 p-4 dark:bg-slate-800">
      <AdminHeader withBackButton>Add Studio</AdminHeader>
      <div className="my-4">
        <FormContainer onSubmit={addStudioMutation.mutate}>
          <div className="flex items-center justify-center gap-2">
            <div className="flex w-3/6 flex-col items-start justify-center gap-2">
              <label id="studio" className="font-poppins text-xs md:text-sm">
                Studio Number
              </label>
              <FormInput
                id="studio"
                type="text"
                value={studio}
                setValue={setStudio}
                width="full"
              />
            </div>
            <div className="flex w-3/6 flex-col items-start justify-center gap-2">
              <label
                id="studioCapacity"
                className="font-poppins text-xs md:text-sm"
              >
                Studio Capacity
              </label>
              <FormInput
                id="studioCapacity"
                type="text"
                value={studioCapacity}
                setValue={setStudioCapacity}
                width="full"
              />
            </div>
          </div>
          <div className="mt-4 w-5/6 text-center lg:w-3/6">
            <FormSubmit value="Submit" width="3/6" />
          </div>
        </FormContainer>
      </div>
    </AnimatedContainer>
  );
};

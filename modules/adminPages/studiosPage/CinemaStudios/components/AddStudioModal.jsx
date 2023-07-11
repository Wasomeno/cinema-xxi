import { useSession } from "next-auth/react";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys";

export const AddStudioModal = ({ closeModal }) => {
  const [studio, setStudio] = useState("");
  const [studioCapacity, setStudioCapacity] = useState("");
  const { data: sessionData } = useSession();

  const sideEffects = useSideEffects({
    context: "add",
    object: "studio",
    queryKeys: cinemaStudioQueryKeys.allStudio,
  });

  const addStudio = mutation({
    url: `/api/cinemas/${sessionData.user.cinemaId}/studios`,
    method: "POST",
    body: {
      studioNumber: studio,
      studioCapacity,
    },
    sideEffects: sideEffects,
  });

  return (
    <FormModalContainer
      title="Add Studio"
      onSubmit={addStudio.mutate}
      closeModal={closeModal}
      className="lg:h-4note/6 lg:w-2/6"
    >
      <FormModalContainer.Input
        type="number"
        labelText="Studio Number"
        value={studio}
        setValue={setStudio}
      />
      <FormModalContainer.Input
        type="number"
        labelText="Studio Capacity"
        value={studioCapacity}
        setValue={setStudioCapacity}
      />
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

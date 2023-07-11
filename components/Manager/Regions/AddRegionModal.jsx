import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";

export const AddRegionModal = ({ closeModal }) => {
  const [regionName, setRegionName] = useState("");
  const sideEffects = useSideEffects({
    text: "Adding new Region",
    queryKeys: regionQueryKeys.allRegion,
  });

  const addRegion = mutation({
    url: "/api/regions",
    body: { regionName },
    method: "POST",
    sideEffects,
  });

  return (
    <FormModalContainer
      title="Add Region"
      closeModal={closeModal}
      onSubmit={addRegion.mutate}
    >
      <FormModalContainer.Input
        type="text"
        labelText="Region Name"
        value={regionName}
        setValue={setRegionName}
      />
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

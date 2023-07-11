import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";

export const EditStudioModal = ({ studioDetails, closeModal }) => {
  const [studioNumber, setStudioNumber] = useState(studioDetails.studio);
  const [capacity, setCapacity] = useState(studioDetails.capacity);
  return (
    <FormModalContainer
      title="Edit Studio"
      onSubmit={() => {}}
      closeModal={closeModal}
    >
      <FormModalContainer.Input
        type="text"
        labelText="Studio Number"
        value={studioNumber}
        setValue={setStudioNumber}
      />
      <FormModalContainer.Input
        type="text"
        labelText="Capacity"
        value={capacity}
        setValue={setCapacity}
      />
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";

export const EditRegionModal = ({ regionDetails, closeModal }) => {
  const [name, setName] = useState(regionDetails.name);

  const sideEffects = useSideEffects({
    text: "Updating Region",
    queryKeys: regionQueryKeys.allRegion,
  });

  const updateRegion = mutation({
    method: "PUT",
    url: "/api/regions/" + regionDetails.id,
    body: {
      name,
    },
    sideEffects,
  });

  return (
    <FormModalContainer
      title="Edit Movie"
      onSubmit={updateRegion.mutate}
      closeModal={closeModal}
    >
      <div className="flex flex-col gap-2">
        <label id="regionName" className="text-sm tracking-wider">
          Name
        </label>
        <input
          id="regionName"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-md border border-slate-600 bg-transparent p-1"
        />
      </div>
      <div className="my-3 text-center">
        <button className="h-10 w-44 rounded-lg bg-green-700 bg-opacity-75 font-poppins text-sm font-medium">
          Submit
        </button>
      </div>
    </FormModalContainer>
  );
};

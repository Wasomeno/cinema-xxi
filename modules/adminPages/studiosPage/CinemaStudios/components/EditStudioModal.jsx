import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaStudioQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaStudioQueryKeys";

export const EditStudioModal = () => {
  const [studioNumber, setStudioNumber] = useState();
  const [capacity, setCapacity] = useState();

  const router = useRouter();
  const { data: session } = useSession();
  const studioDetails = query({
    queryKey: ["studio", router.query.id],
    url: `/api/cinemas/${session.user.cinemaId}/studios/${router.query.id}`,
  });

  const sideEffects = useSideEffects({
    queryKeys: cinemaStudioQueryKeys.allStudio,
    text: `Updating studio ${studioNumber}`,
  });

  const updateStudio = mutation({
    method: "PATCH",
    body: {
      studio: studioNumber,
      capacity,
    },
    url: `/api/cinemas/${session.user.cinemaId}/studios/${router.query.id}`,
    sideEffects,
  });

  useEffect(() => {
    if (!studioDetails.isLoading) {
      setStudioNumber(studioDetails.data?.studio);
      setCapacity(studioDetails.data?.capacity);
    }
  }, [studioDetails.isLoading]);

  return (
    <FormModalContainer
      title="Edit Studio"
      onSubmit={() => updateStudio.mutate()}
      closeModal={() => router.push("/admin/studios")}
      className="lg:w-2/6 lg:h-4/6"
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

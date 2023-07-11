import { useSession } from "next-auth/react";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const EditCinemaAdminModal = ({ closeModal, adminDetails }) => {
  const [username, setUsername] = useState(adminDetails.username);
  const [password, setPassword] = useState(adminDetails.password);
  const [name, setName] = useState(adminDetails.name);

  const session = useSession();
  const sideEffects = useSideEffects({
    text: "Updating admin",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinemaId),
  });

  const updateCinemaAdmin = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/admins/${adminDetails.id}`,
    method: "PATCH",
    body: {
      name,
      username,
      password,
    },
    sideEffects,
  });

  return (
    <FormModalContainer
      onSubmit={updateCinemaAdmin.mutate}
      title="Edit Admin"
      closeModal={closeModal}
    >
      <FormModalContainer.Input
        type="text"
        labelText="Name"
        value={name}
        setValue={setName}
      />
      <FormModalContainer.Input
        type="text"
        labelText="Username"
        value={username}
        setValue={setUsername}
      />
      <FormModalContainer.Input
        type="password"
        labelText="Password"
        value={password}
        setValue={setPassword}
      />
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

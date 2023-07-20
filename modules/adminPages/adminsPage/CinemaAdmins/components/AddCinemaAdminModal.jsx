import { useSession } from "next-auth/react";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const AddCinemaAdminModal = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const session = useSession();
  const sideEffects = useSideEffects({
    text: "Adding new admin",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinemaId),
  });
  const addCinemaAdmin = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/admins`,
    method: "POST",
    body: {
      name,
      username,
      password,
    },
    sideEffects,
  });

  return (
    <FormModalContainer
      onSubmit={addCinemaAdmin.mutate}
      title="Add Admin"
      closeModal={closeModal}
      className="lg:w-2/6 lg:h-4/6"
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

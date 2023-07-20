import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const EditCinemaAdminModal = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { data: session } = useSession();

  const adminDetails = query({
    queryKey: ["admin", router.query.id],
    url: `/api/cinemas/${session.user.cinemaId}/admins/${router.query.id}`,
    enabledCondition: session.user.cinemaId !== undefined,
  });

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

  useEffect(() => {
    if (!adminDetails.isLoading) {
      setName(adminDetails.data?.name);
      setUsername(adminDetails.data?.username);
      setPassword(adminDetails.data?.password);
    }
  }, [adminDetails.isLoading]);

  return (
    <FormModalContainer
      onSubmit={updateCinemaAdmin.mutate}
      title="Edit Admin"
      closeModal={() => router.push(`/admin/admins`)}
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

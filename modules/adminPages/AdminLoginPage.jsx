import { signIn } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "wagmi";

import AnimatedContainer from "@/components/AnimatedContainer";
import { FormContainer, FormInput, FormSubmit } from "@/components/Forms";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sideEffects = useSideEffects({
    text: "Signing in",
  });

  const signInMutation = useMutation(
    () =>
      signIn("credentials", {
        username,
        password,
        role: "admin",
        callbackUrl: "/admin",
      }),
    sideEffects
  );

  return (
    <AnimatedContainer className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-slate-800">
      <div className="flex h-80 w-96 flex-col items-center justify-center gap-4 rounded-lg border bg-gray-50 p-4 shadow-sm dark:bg-slate-700">
        <h5 className="font-poppins text-sm font-medium lg:text-base">
          Admin Login Page
        </h5>
        <FormContainer onSubmit={signInMutation.mutate}>
          <div className="flex w-5/6 flex-col justify-center gap-1">
            <label id="usernameInput" className="font-poppins text-xs">
              Username
            </label>
            <FormInput
              type="text"
              id="usernameInput"
              width="full"
              value={username}
              setValue={setUsername}
            />
          </div>
          <div className="flex w-5/6 flex-col justify-center gap-1">
            <label id="passwordInput" className="font-poppins text-xs">
              Password
            </label>
            <FormInput
              type="password"
              id="passwordInput"
              width="full"
              value={password}
              setValue={setPassword}
            />
          </div>
          <div className="my-2 flex w-full items-center justify-center">
            <FormSubmit value="Submit" width="4/6" />
          </div>
        </FormContainer>
      </div>
    </AnimatedContainer>
  );
};

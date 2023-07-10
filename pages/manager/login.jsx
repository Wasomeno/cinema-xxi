import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import { FormContainer, FormInput, FormSubmit } from "@/components/Forms";
import { ManagerLayout } from "@/components/Layouts/ManagerLayout";
import { Spinner } from "@/components/Spinner";

const ManagerLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const router = useRouter();
  const login = useMutation(() =>
    signIn("credentials", {
      username,
      password,
      role: "manager",
      callbackUrl: "/manager",
    })
  );

  if (session.data) router.push("/manager");
  return (
    <ManagerLayout>
      <AnimatedContainer className="flex h-screen flex-col items-center justify-center bg-opacity-95 bg-gradient-to-b from-slate-600 via-neutral-600 to-gray-600 dark:from-slate-900 dark:via-neutral-900 dark:to-gray-900">
        <div className="flex h-80 w-5/6 flex-col items-center justify-center gap-4 rounded-md bg-slate-100 p-4 shadow-md backdrop-blur-md dark:bg-slate-800 sm:w-6/12 md:w-5/12 lg:w-3/12">
          <h5 className="font-poppins text-sm font-medium lg:text-base">
            Manager Login Page
          </h5>
          <FormContainer onSubmit={login.mutate}>
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
              {login.isLoading ? (
                <Spinner />
              ) : (
                <FormSubmit value="Submit" width="4/6" />
              )}
            </div>
          </FormContainer>
        </div>
        <div className="absolute bottom-2.5">
          <p className="text-xs tracking-wider text-slate-400">
            Cinema XXI 2023
          </p>
        </div>
      </AnimatedContainer>
    </ManagerLayout>
  );
};

export default ManagerLoginPage;

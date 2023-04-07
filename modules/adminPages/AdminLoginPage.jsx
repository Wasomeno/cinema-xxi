import { useState } from "react";
import { MoonLoader } from "react-spinners";

import AnimatedContainer from "@/components/AnimatedContainer";
import { Spinner } from "@/components/Icons/Spinner";
import { loginMutation } from "@/components/reactQuery/mutations/login";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = loginMutation({ username, password, role: "admin" });

  return (
    <AnimatedContainer className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 bg-opacity-95 dark:bg-slate-800">
      <div className="flex h-80 w-5/6 flex-col items-center justify-center gap-4 rounded-md bg-neutral-300 p-4 shadow-md backdrop-blur-md dark:bg-slate-700 lg:w-3/12">
        <h5 className="font-poppins text-sm font-medium lg:text-base">
          Admin Login Page
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
              <Spinner size="medium" />
            ) : (
              <FormSubmit value="Submit" width="4/6" />
            )}
          </div>
        </FormContainer>
      </div>
    </AnimatedContainer>
  );
};

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import { Form } from "@/components/Forms";
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

  if (session.data?.user.role === "manager") router.push("/manager");
  return (
    <AnimatedContainer className="flex h-screen flex-col gap-6 items-center justify-center bg-slate-100">
      <h1 className="font-medium text-2xl font-openSans">Manager Login</h1>
      <Form onSubmit={login.mutate} className="flex flex-col gap-2 w-72">
        <Form.Input
          type="string"
          labelText="Username"
          value={username}
          setValue={setUsername}
        />
        <Form.Input
          type="password"
          labelText="Password"
          value={password}
          setValue={setPassword}
        />
        <Form.Submit text="Login" />
      </Form>
    </AnimatedContainer>
  );
};

export default ManagerLoginPage;

import { useState } from "react"
import Head from "next/head"
import { signIn } from "next-auth/react"
import { useMutation } from "wagmi"

import AnimatedContainer from "@/components/AnimatedContainer"
import { Form } from "@/components/Forms"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sideEffects = useSideEffects({
    text: "Signing in",
  })

  const login = useMutation(
    () =>
      signIn("credentials", {
        username,
        password,
        role: "admin",
        callbackUrl: "/admin",
      }),
    sideEffects
  )

  return (
    <AnimatedContainer className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-100 dark:bg-slate-900">
      <Head>
        <title>Admin Login</title>
      </Head>
      <h1 className="font-openSans text-lg font-medium lg:text-2xl">
        Admin Login
      </h1>
      <Form onSubmit={login.mutate} className="flex w-72 flex-col gap-2">
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
  )
}

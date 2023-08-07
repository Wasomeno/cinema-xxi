import { useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import { signIn, useSession } from "next-auth/react"

import AnimatedContainer from "@/components/AnimatedContainer"
import { Form } from "@/components/Forms"
import { Spinner } from "@/components/Spinner"

const ManagerLoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const session = useSession()
  const router = useRouter()
  const login = useMutation(() =>
    signIn("credentials", {
      username,
      password,
      role: "manager",
      callbackUrl: "/manager",
    })
  )

  if (session.data?.user.role === "manager") router.push("/manager")
  return (
    <AnimatedContainer className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-100 dark:bg-slate-900">
      <h1 className="font-openSans text-lg font-medium lg:text-2xl">
        Manager Login
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

export default ManagerLoginPage

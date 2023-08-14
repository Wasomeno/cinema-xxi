import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react"
import { useLoading } from "stores/loadingStore"
import { useToast } from "stores/toastStore"
import { useMutation } from "wagmi"

import AnimatedContainer from "@/components/AnimatedContainer"
import { Form } from "@/components/Forms"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [setLoading, setLoadingText] = useLoading()
  const toast = useToast()

  const login = useMutation(
    async () =>
      await signIn("credentials", {
        username,
        password,
        role: "admin",
        callbackUrl: "/admin",
      }),
    {
      onMutate() {
        setLoadingText("Signing in")
        setLoading(true)
      },
      onError() {
        setLoading(false)
        toast.error("Sign failed, try again later")
      },
      onSuccess() {
        setLoading(false)
        toast.success("Sign in success")
      },
    }
  )
  const session = useSession()
  const router = useRouter()

  if (session.data?.user.role === "admin") router.push("/admin")
  return (
    <AnimatedContainer className="flex h-screen flex-col items-center justify-center gap-6 bg-white dark:bg-slate-900">
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
        <Form.Submit text="Sign in" />
      </Form>
    </AnimatedContainer>
  )
}

export default LoginPage

"use client"

import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useLoading } from "@/stores/loadingStore"
import { useToast } from "@/stores/toastStore"
import { signIn, useSession } from "next-auth/react"
import { useMutation } from "wagmi"

import { AnimatedContainer } from "@/components/animated-container"
import { Form } from "@/components/form"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { setLoading, setText } = useLoading()
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
        setText("Signing in")
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
      <title>Admin Login</title>
      <h1 className="font-openSans text-lg font-medium lg:text-2xl">
        Admin Login
      </h1>
      <Form
        onSubmit={() => login.mutate()}
        className="flex w-72 flex-col gap-2"
      >
        <Form.Input
          type="string"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event?.target.value)}
        />
        <Form.Input
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event?.target.value)}
        />
        <Form.Submit text="Sign in" />
      </Form>
    </AnimatedContainer>
  )
}

export default LoginPage

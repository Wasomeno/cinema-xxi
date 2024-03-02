"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const EditCinemaAdminModal = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: session } = useSession()

  const adminId = searchParams.get("id")

  const adminDetails = useQuery({
    queryKey: ["admin", adminId],
    queryFn: () =>
      fetch(`/api/cinemas/${session?.user.cinema?.id}/admins/${adminId}`).then(
        (result) => result.json()
      ),
    enabled: session?.user.cinema?.id !== undefined,
  })

  const sideEffects = useSideEffects({
    text: "Updating admin",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session?.user.cinema?.id),
  })

  const updateCinemaAdmin = mutation({
    url: `/api/cinemas/${session?.user.cinema?.id}/admins/${adminId}`,
    method: "PATCH",
    body: {
      name,
      username,
      password,
    },
    sideEffects,
  })

  useEffect(() => {
    if (!adminDetails.isLoading) {
      setName(adminDetails.data?.name)
      setUsername(adminDetails.data?.username)
      setPassword(adminDetails.data?.password)
    }
  }, [adminDetails.isLoading])

  return (
    <CenteredModal
      closeModal={() => router.push(`/admin/admins`)}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title="Edit Admin"
        className="mb-4"
        closeModal={() => router.push(`/admin/admins`)}
      />
      <Form
        onSubmit={() => {
          updateCinemaAdmin.mutate()
          router.push(`/admin/admins`)
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="space-y-2">
          <Form.Input
            type="text"
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Form.Input
            type="text"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Input
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}

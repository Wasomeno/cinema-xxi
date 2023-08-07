import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { query } from "@/components/reactQuery/queries/query"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const EditCinemaAdminModal = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const { data: session } = useSession()

  const adminDetails = query({
    queryKey: ["admin", router.query.id],
    url: `/api/cinemas/${session.user.cinemaId}/admins/${router.query.id}`,
    enabledCondition: session.user.cinemaId !== undefined,
  })

  const sideEffects = useSideEffects({
    text: "Updating admin",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinemaId),
  })

  const updateCinemaAdmin = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/admins/${adminDetails.id}`,
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
    <CenteredModalContainer
      onSubmit={updateCinemaAdmin.mutate}
      title="Edit Admin"
      closeModal={() => router.push(`/admin/admins`)}
      className="lg:h-4/6 lg:w-2/6"
    >
      <Form className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <Form.Input
            type="text"
            labelText="Name"
            value={name}
            setValue={setName}
          />
          <Form.Input
            type="text"
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
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModalContainer>
  )
}

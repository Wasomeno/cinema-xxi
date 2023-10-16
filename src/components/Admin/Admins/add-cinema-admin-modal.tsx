import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const AddCinemaAdminModal = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const pathname = usePathname()
  const router = useRouter()
  const session = useSession()

  const sideEffects = useSideEffects({
    text: "Adding new admin",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinema?.id),
  })

  const addCinemaAdmin = mutation({
    url: `/api/cinemas/${session.data?.user.cinema?.id}/admins`,
    method: "POST",
    body: {
      name,
      username,
      password,
    },
    sideEffects,
  })

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Admin"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
      <Form
        onSubmit={() => {
          addCinemaAdmin.mutate()
          router.replace(pathname)
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
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

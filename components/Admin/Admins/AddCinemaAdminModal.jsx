import { useState } from "react"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModal, ModalHeader } from "@/components/Modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const AddCinemaAdminModal = ({ closeModal }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const session = useSession()
  const sideEffects = useSideEffects({
    text: "Adding new admin",
    queryKeys: cinemaQueryKeys.cinemaAdmins(session.data?.user.cinemaId),
  })
  const addCinemaAdmin = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/admins`,
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
      closeModal={closeModal}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader title="Add Admin" className="mb-4" closeModal={closeModal} />
      <Form
        onSubmit={() => {
          addCinemaAdmin.mutate()
          closeModal()
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
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
    </CenteredModal>
  )
}
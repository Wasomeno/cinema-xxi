import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import AdminHeader from "@/components/Headers/AdminHeader"

import { AddStudioModal } from "./components/AddStudioModal"
import { DeleteStudioModal } from "./components/DeleteStudioModal"
import { EditStudioModal } from "./components/EditStudioModal"
import { StudioTable } from "./components/StudioTable"

export const CinemaStudios = () => {
  const [selectedStudios, setSelectedStudios] = useState([])
  const { query, push } = useRouter()
  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Studios</AdminHeader>
      <StudioTable
        selectedStudios={selectedStudios}
        setSelectedStudios={setSelectedStudios}
      />
      <AnimatePresence>
        {query.add && (
          <AddStudioModal closeModal={() => push("/admin/studios")} />
        )}
        {query.edit && <EditStudioModal />}
        {query.delete && (
          <DeleteStudioModal
            selectedStudio={selectedStudios}
            closeModal={() => push("/admin/studios")}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

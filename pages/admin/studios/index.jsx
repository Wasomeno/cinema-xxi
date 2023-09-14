import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import { AddStudioModal } from "@/components/Admin/Studios/AddStudioModal"
import { DeleteStudioModal } from "@/components/Admin/Studios/DeleteStudioModal"
import { EditStudioModal } from "@/components/Admin/Studios/EditStudioModal"
import { StudioTable } from "@/components/Admin/Studios/StudioTable"
import AdminHeader from "@/components/Headers/AdminHeader"
import { AdminLayout } from "@/components/Layouts/AdminLayout"

export default function CinemaStudiosPage() {
  const [selectedStudios, setSelectedStudios] = useState([])
  const { query, push } = useRouter()
  return (
    <AdminLayout pageTitle="Studios">
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
    </AdminLayout>
  )
}

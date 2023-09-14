import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import AdminHeader from "@/components/Headers/AdminHeader"
import { AdminLayout } from "@/components/Layouts/AdminLayout"

import { AddCinemaAdminModal } from "./components/AddCinemaAdminModal"
import { CinemaAdminsTable } from "./components/CinemaAdminsTable"
import { DeleteCinemaAdminsModal } from "./components/DeleteCinemaAdminsModal"
import { EditCinemaAdminModal } from "./components/EditCinemaAdminModal"

export default function CinemaAdminsPage() {
  const [selectedAdmins, setSelectedAdmins] = useState([])
  const { query, push } = useRouter()
  return (
    <AdminLayout pageTitle="Admins">
      <div className="flex flex-1 flex-col rounded-lg p-4">
        <AdminHeader>Admins</AdminHeader>
        <CinemaAdminsTable
          selectedAdmins={selectedAdmins}
          setSelectedAdmins={setSelectedAdmins}
        />
        <AnimatePresence>
          {query.add && (
            <AddCinemaAdminModal closeModal={() => push("/admin/admins")} />
          )}
          {query.edit && <EditCinemaAdminModal />}
          {query.delete && (
            <DeleteCinemaAdminsModal
              closeModal={() => push("/admin/admins")}
              selectedAdmins={selectedAdmins}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}

import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import { AddCinemaAdminModal } from "@/components/Admin/Admins/AddCinemaAdminModal"
import { CinemaAdminsTable } from "@/components/Admin/Admins/CinemaAdminsTable"
import { DeleteCinemaAdminsModal } from "@/components/Admin/Admins/DeleteCinemaAdminsModal"
import { EditCinemaAdminModal } from "@/components/Admin/Admins/EditCinemaAdminModal"
import AdminHeader from "@/components/Headers/AdminHeader"
import { AdminLayout } from "@/components/Layouts/AdminLayout"

export default function CinemaAdminsPage() {
  const [selectedAdmins, setSelectedAdmins] = useState([])
  const { query, push } = useRouter()
  return (
    <AdminLayout pageTitle="Admins">
      <div className="flex w-full flex-1 flex-col rounded-lg p-4">
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

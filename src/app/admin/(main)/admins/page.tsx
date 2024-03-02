import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AddCinemaAdminModal } from "@/components/Admin/Admins/add-cinema-admin-modal"
import { cinemaAdminsTableColumns } from "@/components/Admin/Admins/admins-data-table-columns"
import { DeleteCinemaAdminsModal } from "@/components/Admin/Admins/delete-cinema-admins-modal"
import { EditCinemaAdminModal } from "@/components/Admin/Admins/edit-cinema-admin-modal"
import { ClientAnimatePresence } from "@/components/animate-presence"
import { DataTable } from "@/components/data-table"
import { AdminHeader } from "@/components/Headers/admin-header"

type CinemaAdminsPageProps = {
  searchParams: { add: string; edit: string; delete: string }
}

export const metadata: Metadata = {
  title: "Admins",
}

export default async function CinemaAdminsPage({
  searchParams,
}: CinemaAdminsPageProps) {
  const session = await getServerSession(authOptions)
  const admins = await prisma.admin.findMany({
    where: { cinemaId: session?.user.cinema?.id },
  })

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Admins</AdminHeader>
      <DataTable columns={cinemaAdminsTableColumns} data={admins} />
      <ClientAnimatePresence>
        {searchParams.add && <AddCinemaAdminModal />}
        {searchParams.edit && <EditCinemaAdminModal />}
        {searchParams.delete && <DeleteCinemaAdminsModal />}
      </ClientAnimatePresence>
    </div>
  )
}

import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AddStudioModal } from "@/components/Admin/Studios/add-studio-modal"
import { DeleteStudioModal } from "@/components/Admin/Studios/delete-studio-modal"
import { EditStudioModal } from "@/components/Admin/Studios/edit-studio-modal"
import { studioDataTableColumns } from "@/components/Admin/Studios/studio-data-table-columns"
import { ClientAnimatePresence } from "@/components/animate-presence"
import { DataTable } from "@/components/data-table"
import { AdminHeader } from "@/components/Headers/admin-header"

type CinemaStudiosPageProps = {
  searchParams: { add: string; delete: string; edit: string }
}

export const metadata: Metadata = {
  title: "Studios",
}

export default async function CinemaStudiosPage({
  searchParams,
}: CinemaStudiosPageProps) {
  const session = await getServerSession(authOptions)
  const studios = await prisma.studio.findMany({
    where: { cinemaId: session?.user.cinema?.id },
  })

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Studios</AdminHeader>
      <DataTable columns={studioDataTableColumns} data={studios} />
      <ClientAnimatePresence>
        {searchParams.add && <AddStudioModal />}
        {searchParams.edit && <EditStudioModal />}
        {searchParams.delete && <DeleteStudioModal />}
      </ClientAnimatePresence>
    </div>
  )
}

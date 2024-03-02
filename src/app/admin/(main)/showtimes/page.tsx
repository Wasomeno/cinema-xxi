import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AddCinemaShowtimeModal } from "@/components/Admin/Showtimes/add-cinema-showtime-modal"
import { cinemaShowtimeDataTableColumns } from "@/components/Admin/Showtimes/cinema-showtimes-data-table-columns"
import { DeleteShowtimeModal } from "@/components/Admin/Showtimes/delete-cinema-showtime-modal"
import { EditCinemaShowtimeModal } from "@/components/Admin/Showtimes/edit-cinema-showtime-modal"
import { ClientAnimatePresence } from "@/components/animate-presence"
import { DataTable } from "@/components/data-table"
import { AdminHeader } from "@/components/Headers/admin-header"

type Props = {
  searchParams: {
    add: string
    edit: string
    delete: string
  }
}

export const metadata: Metadata = {
  title: "Showtimes",
}

export default async function CinemaShowtimesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions)
  const showtimes = await prisma.showtime.findMany({
    where: { cinemaId: session?.user.cinema?.id },
  })

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Showtimes</AdminHeader>
      <DataTable data={showtimes} columns={cinemaShowtimeDataTableColumns} />
      <ClientAnimatePresence>
        {searchParams.add && <AddCinemaShowtimeModal />}
        {searchParams.edit && <EditCinemaShowtimeModal />}
        {searchParams.delete && <DeleteShowtimeModal />}
      </ClientAnimatePresence>
    </div>
  )
}

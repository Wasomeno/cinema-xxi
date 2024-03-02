import { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { AddStudioShowtimeModal } from "@/components/Admin/Studios/StudioDetails/AddStudioShowtimeModal"
import { DeleteStudioShowtimesModal } from "@/components/Admin/Studios/StudioDetails/delete-studio-showtime-modal"
import { EditStudioShowtimeModal } from "@/components/Admin/Studios/StudioDetails/edit-studio-showtime-modal"
import { studioShowtimesTableColumns } from "@/components/Admin/Studios/StudioDetails/studio-showtimes-data-table-columns"
import { StudioShowtimeDetailsModal } from "@/components/Admin/Studios/StudioDetails/view-studio-showtime-modal"
import { ClientAnimatePresence } from "@/components/animate-presence"
import { DataTable } from "@/components/data-table"
import { AdminHeader } from "@/components/Headers/admin-header"

type CinemaStudioPageProps = {
  params: { studioId: string }
  searchParams: { view: string; edit: string; delete: string; add: string }
}

export default async function CinemaStudioDetailsPage({
  params,
  searchParams,
}: CinemaStudioPageProps) {
  const studio = await prisma.studio.findUnique({
    where: { id: parseInt(params.studioId) },
    include: {
      showtime_to_movie: { include: { movie: true, showtime: true } },
    },
  })

  return (
    <div className="flex flex-1 flex-col p-4">
      <AdminHeader>Studio {studio?.studio} Showtimes</AdminHeader>
      <DataTable
        columns={studioShowtimesTableColumns(params.studioId)}
        data={
          studio?.showtime_to_movie as Prisma.ShowtimeToMovieGetPayload<{
            include: { movie: true; showtime: true }
          }>[]
        }
      />
      <ClientAnimatePresence>
        {searchParams.view && <StudioShowtimeDetailsModal />}
        {searchParams.add && <AddStudioShowtimeModal />}
        {searchParams.edit && <EditStudioShowtimeModal />}
        {searchParams.delete && <DeleteStudioShowtimesModal />}
      </ClientAnimatePresence>
    </div>
  )
}

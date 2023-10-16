import { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { StudioShowtimesTable } from "@/components/Admin/Studios/StudioDetails/studio-showtimes-table"
import { AdminHeader } from "@/components/Headers/admin-header"

export default async function CinemaStudioDetailsPage({
  params,
}: {
  params: { studioId: string }
}) {
  const studio = await prisma.studio.findUnique({
    where: { id: parseInt(params.studioId) },
    include: {
      showtime_to_movie: { include: { movie: true, showtime: true } },
    },
  })

  return (
    <div className="flex flex-1 flex-col p-4">
      <AdminHeader>Studio {studio?.studio} Showtimes</AdminHeader>
      <StudioShowtimesTable
        showtimes={
          studio?.showtime_to_movie as Prisma.ShowtimeToMovieGetPayload<{
            include: { movie: true; showtime: true }
          }>[]
        }
      />
    </div>
  )
}

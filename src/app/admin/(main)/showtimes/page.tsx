import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ShowtimesTable } from "@/components/Admin/Showtimes/showtime-table"
import { AdminHeader } from "@/components/Headers/admin-header"

export const metadata: Metadata = {
  title: "Showtimes",
}

export default async function CinemaShowtimesPage() {
  const session = await getServerSession(authOptions)
  const showtimes = await prisma.showtime.findMany({
    where: { cinemaId: session?.user.cinema?.id },
  })
  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Showtimes</AdminHeader>
      <ShowtimesTable showtimes={showtimes} />
    </div>
  )
}

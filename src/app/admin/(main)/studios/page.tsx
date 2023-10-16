import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { StudioTable } from "@/components/Admin/Studios/studio-table"
import { AdminHeader } from "@/components/Headers/admin-header"

export const metadata: Metadata = {
  title: "Studios",
}

export default async function CinemaStudiosPage() {
  const session = await getServerSession(authOptions)
  const studios = await prisma.studio.findMany({
    where: { cinemaId: session?.user.cinema?.id },
  })
  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Studios</AdminHeader>
      <StudioTable studios={studios} />
    </div>
  )
}

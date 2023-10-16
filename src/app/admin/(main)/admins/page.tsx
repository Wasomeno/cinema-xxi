import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CinemaAdminsTable } from "@/components/Admin/Admins/cinema-admins-table"
import { AdminHeader } from "@/components/Headers/admin-header"

export const metadata: Metadata = {
  title: "Admins",
}

export default async function CinemaAdminsPage() {
  const session = await getServerSession(authOptions)
  const admins = await prisma.admin.findMany({
    where: { cinemaId: session?.user.cinema?.id },
  })

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Admins</AdminHeader>
      <CinemaAdminsTable admins={admins} />
    </div>
  )
}

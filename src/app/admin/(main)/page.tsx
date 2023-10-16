import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { AnimatedContainer } from "@/components/animated-container"
import { AdminHeader } from "@/components/Headers/admin-header"

export async function generateMetadata() {
  const session = await getServerSession(authOptions)
  return { title: `Dashboard | ${session?.user.cinema?.name}` }
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  return (
    <AnimatedContainer className="flex flex-1 flex-col rounded-lg p-4">
      <AdminHeader>{session?.user.cinema?.name}</AdminHeader>
    </AnimatedContainer>
  )
}

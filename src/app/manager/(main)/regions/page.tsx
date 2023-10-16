import { Metadata } from "next"

import { prisma } from "@/lib/prisma"
import { ManagerHeader } from "@/components/Headers/manager-header"
import { AllRegionsTable } from "@/components/Manager/Regions/regions-table"

export const metadata: Metadata = {
  title: "Regions",
}

export default async function RegionPage() {
  const regions = await prisma.region.findMany()
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
      <ManagerHeader>Manage Regions</ManagerHeader>
      <AllRegionsTable regions={regions} />
    </div>
  )
}

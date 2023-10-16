import { Props } from "next/script"
import { Cinema } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { AnimatedContainer } from "@/components/animated-container"
import { ManagerHeader } from "@/components/Headers/manager-header"
import { RegionCinemasTable } from "@/components/Manager/Cinemas/region-cinemas-table"

type RegionPageProps = {
  params: { regionId: string }
}

export async function generateMetadata({ params }: RegionPageProps) {
  const region = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
  })

  return {
    title: region?.name,
  }
}

export default async function RegionPage({ params }: RegionPageProps) {
  const region = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
    include: { cinemas: true },
  })
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
      <ManagerHeader>{region?.name}</ManagerHeader>
      <AnimatedContainer className="flex justify-center">
        <div className="w-full space-y-4">
          <RegionCinemasTable cinemas={region?.cinemas as Cinema[]} />
        </div>
      </AnimatedContainer>
    </div>
  )
}

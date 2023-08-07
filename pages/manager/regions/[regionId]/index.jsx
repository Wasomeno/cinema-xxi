import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"
import { prisma } from "lib/prisma"

import AnimatedContainer from "@/components/AnimatedContainer"
import ManagerHeader from "@/components/Headers/ManagerHeader"
import { ManagerLayout } from "@/components/Layouts/ManagerLayout"
import { AddCinemaModal } from "@/components/Manager/Cinemas/AddCinemaModal"
import { CinemaDetailsModal } from "@/components/Manager/Cinemas/CinemaDetailsModal"
import { DeleteCinemasModal } from "@/components/Manager/Cinemas/DeleteCinemasModal"
import { RegionCinemasTable } from "@/components/Manager/Cinemas/RegionCinemasTable"
import { RegionChartSection } from "@/components/Manager/Regions/RegionChartSection"

export async function getStaticPaths() {
  const regions = await prisma.region.findMany()
  const regionParams = regions.map((region) => ({
    params: { regionId: region.id.toString() },
  }))
  return { paths: regionParams, fallback: true }
}

export async function getStaticProps(context) {
  const { params } = context
  const regionDetails = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
  })
  return { props: { regionDetails: regionDetails } }
}

export default function RegionDetailsPage({ regionDetails }) {
  const [selectedCinemas, setSelectedCinemas] = useState([])
  const router = useRouter()
  return (
    <ManagerLayout pageTitle={`Regions - ${regionDetails?.name}`}>
      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
        <ManagerHeader withBackButton>{regionDetails?.name}</ManagerHeader>
        <AnimatedContainer className="flex justify-center">
          <div className="w-full space-y-4">
            <RegionChartSection region={regionDetails?.id} />
            <RegionCinemasTable
              regionId={regionDetails?.id}
              selectedCinemas={selectedCinemas}
              setSelectedCinemas={setSelectedCinemas}
            />
          </div>
        </AnimatedContainer>
        <AnimatePresence>
          {router.query.view && <CinemaDetailsModal />}
          {router.query.add && (
            <AddCinemaModal
              closeModal={() =>
                router.push(`/manager/regions/${regionDetails?.id}`)
              }
            />
          )}
          {router.query.delete && (
            <DeleteCinemasModal
              regionId={regionDetails?.id}
              closeModal={() =>
                router.push(`/manager/regions/${regionDetails?.id}`)
              }
              selectedCinemas={selectedCinemas}
            />
          )}
        </AnimatePresence>
      </div>
    </ManagerLayout>
  )
}

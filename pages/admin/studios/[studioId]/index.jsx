import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"
import { prisma } from "lib/prisma"

import { AddStudioShowtimeModal } from "@/components/Admin/Studios/StudioDetails/AddStudioShowtimeModal"
import { DeleteStudioShowtimesModal } from "@/components/Admin/Studios/StudioDetails/DeleteStudioShowtimesModal"
import { EditStudioShowtimeModal } from "@/components/Admin/Studios/StudioDetails/EditStudioShowtimeModal"
import { StudioShowtimeDetailsModal } from "@/components/Admin/Studios/StudioDetails/StudioShowtimeDetailsModal"
import { StudioShowtimesTable } from "@/components/Admin/Studios/StudioDetails/StudioShowtimesTable"
import AdminHeader from "@/components/Headers/AdminHeader"
import { AdminLayout } from "@/components/Layouts/AdminLayout"

export async function getServerSideProps(context) {
  const { params } = context

  const studioDetails = await prisma.studio.findUnique({
    where: { id: parseInt(params.studioId) },
  })

  return { props: { studioDetails } }
}

export default function CinemaStudioDetailsPage({ studioDetails }) {
  const [selectedShowtimes, setSelectedShowtimes] = useState([])
  const router = useRouter()
  return (
    <AdminLayout pageTitle={`Studio ${studioDetails.studio}`}>
      <div className="flex flex-1 flex-col p-4">
        <AdminHeader>Studio {studioDetails.studio} Showtimes</AdminHeader>
        <StudioShowtimesTable
          selectedShowtimes={selectedShowtimes}
          setSelectedShowtimes={setSelectedShowtimes}
        />
        <AnimatePresence>
          {router.query.view && (
            <StudioShowtimeDetailsModal
              closeModal={() =>
                router.push(`/admin/studios/${router.query.studioId}`)
              }
              showtimeDetails={state.dataDetails}
            />
          )}
          {router.query.add && (
            <AddStudioShowtimeModal
              closeModal={() =>
                router.push(`/admin/studios/${router.query.studioId}`)
              }
            />
          )}
          {router.query.edit && (
            <EditStudioShowtimeModal
              closeModal={() =>
                router.push(`/admin/studios/${router.query.studioId}`)
              }
            />
          )}
          {router.query.delete && (
            <DeleteStudioShowtimesModal
              closeModal={() =>
                router.push(`/admin/studios/${router.query.studioId}`)
              }
              selectedShowtimes={selectedShowtimes}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}

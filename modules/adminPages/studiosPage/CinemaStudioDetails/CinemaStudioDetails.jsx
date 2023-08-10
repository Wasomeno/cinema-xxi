import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import AdminHeader from "@/components/Headers/AdminHeader"

import { AddStudioShowtimeModal } from "./components/AddStudioShowtimeModal"
import { DeleteStudioShowtimesModal } from "./components/DeleteStudioShowtimesModal"
import { EditStudioShowtimeModal } from "./components/EditStudioShowtimeModal"
import { StudioShowtimeDetailsModal } from "./components/StudioShowtimeDetailsModal"
import { StudioShowtimesTable } from "./components/StudioShowtimesTable"

export const CinemaStudioDetails = ({ studioDetails }) => {
  const [selectedShowtimes, setSelectedShowtimes] = useState([])
  const router = useRouter()
  return (
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
  )
}

import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"

import AdminHeader from "@/components/Headers/AdminHeader"

import { DeleteStudioShowtimesModal } from "./components/DeleteStudioShowtimesModal"
import { StudioShowtimeDetailsModal } from "./components/StudioShowtimeDetailsModal"
import { StudioShowtimesTable } from "./components/StudioShowtimesTable"

export const CinemaStudioDetails = ({ studioDetails }) => {
  return (
    <div className="flex flex-1 flex-col rounded-lg border bg-white p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Studio {studioDetails.studio} Showtimes</AdminHeader>
      {/* <StudioShowtimesTable dispatch={dispatch} /> */}
      {/* <AnimatePresence>
        {state.showDetailsModal && (
          <StudioShowtimeDetailsModal
            closeModal={() => dispatch({ type: "close_details_modal" })}
            showtimeDetails={state.dataDetails}
          />
        )}
        {state.showAddModal && (
          <AddStudioShowtimeModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {state.showEditModal && (
          <EditStudioShowtimeModal
            closeModal={() => dispatch({ type: "close_edit_modal" })}
            showtimeDetails={state.dataDetails}
          />
        )}
        {state.showDeleteModal && (
          <DeleteStudioShowtimesModal
            closeModal={() => dispatch({ type: "close_delete_modal" })}
            selectedShowtimes={state.selectedData}
          />
        )}
      </AnimatePresence> */}
    </div>
  )
}

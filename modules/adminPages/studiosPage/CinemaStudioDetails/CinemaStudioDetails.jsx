import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import dynamic from "next/dynamic";
import { useReducer } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";

import { DeleteStudioShowtimesModal } from "./components/DeleteStudioShowtimesModal";
import { StudioShowtimeDetailsModal } from "./components/StudioShowtimeDetailsModal";
import { StudioShowtimesTable } from "./components/StudioShowtimesTable";

const AddStudioShowtimeModal = dynamic(() =>
  import("./components/AddStudioShowtimeModal").then(
    (component) => component.AddStudioShowtimeModal
  )
);

const EditStudioShowtimeModal = dynamic(() =>
  import("./components/EditStudioShowtimeModal").then(
    (component) => component.EditStudioShowtimeModal
  )
);

const studioDetailsDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

export const CinemaStudioDetails = ({ studioDetails }) => {
  const [state, dispatch] = useReducer(
    cinemaReducer,
    studioDetailsDefaultState
  );

  return (
    <div className="flex min-h-screen flex-1 flex-col rounded-lg border bg-slate-50 p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Studio {studioDetails.studio} Showtimes</AdminHeader>
      <StudioShowtimesTable dispatch={dispatch} />
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

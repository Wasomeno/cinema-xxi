import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import { useRouter } from "next/router";
import { useReducer } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";

import { AddStudioModal } from "./components/AddStudioModal";
import { DeleteStudioModal } from "./components/DeleteStudioModal";
import { EditStudioModal } from "./components/EditStudioModal";
import { StudioTable } from "./components/StudioTable";

const studioDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

export const CinemaStudios = () => {
  const [state, dispatch] = useReducer(cinemaReducer, studioDefaultState);
  const { query } = useRouter();
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white rounded-lg border p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Studios</AdminHeader>
      <StudioTable dispatch={dispatch} />
      <AnimatePresence>
        {state.showAddModal && (
          <AddStudioModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {query.edit && <EditStudioModal />}
        {state.showDeleteModal && (
          <DeleteStudioModal
            selectedStudio={state.selectedData}
            closeModal={() => dispatch({ type: "close_delete_modal" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import { useReducer } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";

import { AddCinemaAdminModal } from "./components/AddCinemaAdminModal";
import { CinemaAdminsTable } from "./components/CinemaAdminsTable";
import { DeleteCinemaAdminsModal } from "./components/DeleteCinemaAdminsModal";
import { EditCinemaAdminModal } from "./components/EditCinemaAdminModal";

const adminsDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

export const CinemaAdmins = () => {
  const [state, dispatch] = useReducer(cinemaReducer, adminsDefaultState);
  return (
    <div className="flex min-h-screen flex-1 flex-col rounded-lg border bg-slate-50 p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Admins</AdminHeader>
      <CinemaAdminsTable dispatch={dispatch} />
      <AnimatePresence>
        {state.showAddModal && (
          <AddCinemaAdminModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {state.showEditModal && (
          <EditCinemaAdminModal
            closeModal={() => dispatch({ type: "close_edit_modal" })}
            adminDetails={state.dataDetails}
          />
        )}
        {state.showDeleteModal && (
          <DeleteCinemaAdminsModal
            closeModal={() => dispatch({ type: "close_delete_modal" })}
            selectedAdmins={state.selectedData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

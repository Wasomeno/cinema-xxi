import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useReducer } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";

import { ShowtimesTable } from "./components/ShowtimesTable";

const AddCinemaShowtimeModal = dynamic(
  async () =>
    (await import("./components/AddCinemaShowtimeModal")).AddCinemaShowtimeModal
);

const EditCinemaShowtimeModal = dynamic(
  async () =>
    (await import("./components/EditCinemaShowtimeModal"))
      .EditCinemaShowtimeModal
);

const DeleteShowtimeModal = dynamic(
  async () =>
    (await import("./components/DeleteShowtimeModal")).DeleteShowtimeModal
);

const showtimeDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

export const CinemaShowtimes = () => {
  const [state, dispatch] = useReducer(cinemaReducer, showtimeDefaultState);
  const {query} = useRouter();
  return (
    <div className="flex min-h-screen flex-1 flex-col rounded-lg border bg-white p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Showtimes</AdminHeader>
      <ShowtimesTable dispatch={dispatch} />
      <AnimatePresence>
        {state.showAddModal && (
          <AddCinemaShowtimeModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {query.edit && (
          <EditCinemaShowtimeModal
            closeModal={() => dispatch({ type: "close_edit_modal" })}
          />
        )}
        {state.showDeleteModal && (
          <DeleteShowtimeModal
            closeModal={() => dispatch({ type: "close_edit_modal" })}
            selectedShowtimes={state.selectedDatas}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

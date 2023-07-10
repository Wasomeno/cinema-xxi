import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import dynamic from "next/dynamic";
import { useReducer } from "react";

import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerLayout } from "@/components/Layouts/ManagerLayout";
import { AllMoviesTable } from "@/components/Manager/Movies/AllMoviesTable";
import { TableRowDetailsModal } from "@/components/TableRowDetailsModal";

const AddMoviesModal = dynamic(
  async () =>
    (await import("@/components/Manager/Movies/AddMoviesModal")).AddMoviesModal
);

const EditMovieModal = dynamic(
  async () =>
    (await import("@/components/Manager/Movies/EditMovieModal")).EditMovieModal
);

const DeleteMoviesModal = dynamic(
  async () =>
    (await import("@/components/Manager/Movies/DeleteMoviesModal"))
      .DeleteMoviesModal
);

const movieDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

const Movies = () => {
  const [state, dispatch] = useReducer(cinemaReducer, movieDefaultState);
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll rounded-lg border bg-slate-50 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:border-slate-500 dark:bg-slate-700">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <AllMoviesTable dispatch={dispatch} />
      <AnimatePresence>
        {state.showDetailsModal && (
          <TableRowDetailsModal
            title="Movie Details"
            closeModal={() => dispatch({ type: "close_details_modal" })}
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm">Title</span>
              <h5>{state.dataDetails.title}</h5>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Casts</span>
              <h5>{state.dataDetails.casts}</h5>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Casts</span>
              <h5>{state.dataDetails.duration}</h5>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Synopsis</span>
              <p className="tracking-wide">{state.dataDetails.synopsis}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Watched Amount</span>
              <p className="tracking-wide">{state.dataDetails.watchedAmount}</p>
            </div>
          </TableRowDetailsModal>
        )}

        {state.showAddModal && (
          <AddMoviesModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {state.showEditModal && (
          <EditMovieModal
            closeModal={() => dispatch({ type: "close_edit_modal" })}
            movieDetails={state.dataDetails}
          />
        )}
        {state.showDeleteModal && (
          <DeleteMoviesModal
            closeModal={() => dispatch({ type: "close_delete_modal" })}
            selectedMovies={state.selectedData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MoviesPage() {
  return (
    <ManagerLayout pageTitle="Movies">
      <Movies />
    </ManagerLayout>
  );
}

import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";
import TableRowMenu from "@/components/TableRowMenu";

import { CinemaMovieDetailsModal } from "./components/CinemaMovieDetailsModal";
import { MoviesTable } from "./components/MoviesTable";

const AddCinemaMovieModal = dynamic(
  async () =>
    (await import("./components/AddCinemaMovieModal")).AddCinemaMovieModal
);

const DeleteCinemaMovieModal = dynamic(
  async () =>
    (await import("./components/DeleteCinemaMovieModal")).DeleteCinemaMovieModal
);

const movieDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

export const CinemaMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [state, dispatch] = useReducer(cinemaReducer, movieDefaultState);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-1 flex-col rounded-lg border bg-slate-50 p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Movies</AdminHeader>
      <MoviesTable
        openAddModal={() => dispatch({ type: "open_add_modal" })}
        openDeleteModal={() => dispatch({ type: "open_delete_modal" })}
        setSelectedMovies={setSelectedMovies}
        selectedMovies={selectedMovies}
        rowMenu={(movieId) => (
          <TableRowMenu>
            <TableRowMenu.Button
              onClick={() => {
                router.push(`/admin/movies?id=${movieId}&view=true`);
              }}
            >
              View Movie
            </TableRowMenu.Button>
          </TableRowMenu>
        )}
      />
      <AnimatePresence>
        {router.query?.view && (
          <CinemaMovieDetailsModal
            closeModal={() => router.push("/admin/movies")}
            movieId={router.query?.id}
          />
        )}
        {state.showAddModal && (
          <AddCinemaMovieModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {state.showDeleteModal && (
          <DeleteCinemaMovieModal
            closeModal={() => dispatch({ type: "close_delete_modal" })}
            selectedMovies={selectedMovies}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

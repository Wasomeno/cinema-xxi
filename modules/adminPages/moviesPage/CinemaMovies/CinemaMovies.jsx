import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import AdminHeader from "@/components/Headers/AdminHeader"
import TableRowMenu from "@/components/TableRowMenu"

import { CinemaMovieDetailsModal } from "./components/CinemaMovieDetailsModal"
import { MoviesTable } from "./components/MoviesTable"

const AddCinemaMovieModal = dynamic(
  async () =>
    (await import("./components/AddCinemaMovieModal")).AddCinemaMovieModal
)

const DeleteCinemaMovieModal = dynamic(
  async () =>
    (await import("./components/DeleteCinemaMovieModal")).DeleteCinemaMovieModal
)

export const CinemaMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([])
  const router = useRouter()

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Movies</AdminHeader>
      <MoviesTable
        setSelectedMovies={setSelectedMovies}
        selectedMovies={selectedMovies}
        rowMenu={(movieId) => (
          <TableRowMenu>
            <TableRowMenu.Button
              onClick={() => {
                router.push(`/admin/movies?id=${movieId}&view=true`)
              }}
            >
              View Movie
            </TableRowMenu.Button>
          </TableRowMenu>
        )}
      />
      <AnimatePresence>
        {router.query.view && (
          <CinemaMovieDetailsModal
            closeModal={() => router.push("/admin/movies")}
            movieId={router.query?.id}
          />
        )}
        {router.query.add && (
          <AddCinemaMovieModal
            closeModal={() => router.push("/admin/movies")}
          />
        )}
        {router.query.delete && (
          <DeleteCinemaMovieModal
            closeModal={() => router.push("/admin/movies")}
            selectedMovies={selectedMovies}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

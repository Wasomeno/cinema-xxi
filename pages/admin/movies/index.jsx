import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import { CinemaMovieDetailsModal } from "@/components/Admin/Movie/CinemaMovieDetailsModal"
import { MoviesTable } from "@/components/Admin/Movie/MoviesTable"
import AdminHeader from "@/components/Headers/AdminHeader"
import { AdminLayout } from "@/components/Layouts/AdminLayout"
import TableRowMenu from "@/components/TableRowMenu"

const AddCinemaMovieModal = dynamic(
  async () =>
    (await import("@/components/Admin/Movie/AddCinemaMovieModal"))
      .AddCinemaMovieModal
)

const DeleteCinemaMovieModal = dynamic(
  async () =>
    (await import("@/components/Admin/Movie/DeleteCinemaMovieModal"))
      .DeleteCinemaMovieModal
)

export default function CinemaMoviesPage() {
  const [selectedMovies, setSelectedMovies] = useState([])
  const router = useRouter()
  return (
    <AdminLayout title="Movies">
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
    </AdminLayout>
  )
}

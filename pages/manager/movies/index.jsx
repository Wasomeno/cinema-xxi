import { useState } from "react"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"

import ManagerHeader from "@/components/Headers/ManagerHeader"
import { ManagerLayout } from "@/components/Layouts/ManagerLayout"
import { AddMoviesModal } from "@/components/Manager/Movies/AddMoviesModal"
import { AllMoviesTable } from "@/components/Manager/Movies/AllMoviesTable"
import { DeleteMoviesModal } from "@/components/Manager/Movies/DeleteMoviesModal"
import { MovieDetailsModal } from "@/components/Manager/Movies/MovieDetailsModal"

const Movies = () => {
  const [selectedMovies, setSelectedMovies] = useState([])
  const router = useRouter()
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <AllMoviesTable
        selectedMovies={selectedMovies}
        setSelectedMovies={setSelectedMovies}
      />
      <AnimatePresence>
        {router.query.view && (
          <MovieDetailsModal
            closeModal={() => router.push("/manager/movies")}
          />
        )}
        {router.query.add && (
          <AddMoviesModal closeModal={() => router.push("/manager/movies")} />
        )}
        {router.query.delete && (
          <DeleteMoviesModal
            closeModal={() => router.push("/manager/movies")}
            selectedMovies={selectedMovies}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function MoviesPage() {
  return (
    <ManagerLayout pageTitle="Movies">
      <Movies />
    </ManagerLayout>
  )
}

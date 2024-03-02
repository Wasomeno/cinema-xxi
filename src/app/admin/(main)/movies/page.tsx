import { Metadata } from "next"
import { Movie } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AddCinemaMovieModal } from "@/components/Admin/Movie/AddCinemaMovieModal"
import { DeleteCinemaMovieModal } from "@/components/Admin/Movie/delete-cinema-movie-modal"
import { cinemaMoviesDataTableColumns } from "@/components/Admin/Movie/movie-data-table-columns"
import { ViewCinemaMovieModal } from "@/components/Admin/Movie/view-cinema-movie-modal"
import { ClientAnimatePresence } from "@/components/animate-presence"
import { DataTable } from "@/components/data-table"
import { AdminHeader } from "@/components/Headers/admin-header"

type CinemaMoviesPageProps = {
  searchParams: { view: string; add: string; delete: string }
}

export const metadata: Metadata = {
  title: "Movies",
}

export default async function CinemaMoviesPage({
  searchParams,
}: CinemaMoviesPageProps) {
  const session = await getServerSession(authOptions)
  const cinema = await prisma.cinemaMovie.findUnique({
    where: { cinema_id: session?.user.cinema?.id },
    select: { movies: true },
  })

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Movies</AdminHeader>
      <DataTable
        columns={cinemaMoviesDataTableColumns}
        data={cinema?.movies as Movie[]}
      />
      <ClientAnimatePresence>
        {searchParams.view && <ViewCinemaMovieModal />}
        {searchParams.add && <AddCinemaMovieModal />}
        {searchParams.delete && <DeleteCinemaMovieModal />}
      </ClientAnimatePresence>
    </div>
  )
}

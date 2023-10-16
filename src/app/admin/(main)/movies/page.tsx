import { Metadata } from "next"
import { Movie } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { MoviesTable } from "@/components/Admin/Movie/movies-table"
import { AdminHeader } from "@/components/Headers/admin-header"

export const metadata: Metadata = {
  title: "Movies",
}

export default async function CinemaMoviesPage() {
  const session = await getServerSession(authOptions)
  const cinema = await prisma.cinemaMovie.findUnique({
    where: { cinema_id: session?.user.cinema?.id },
    select: { movies: true },
  })

  return (
    <div className="flex w-full flex-1 flex-col rounded-lg p-4">
      <AdminHeader>Movies</AdminHeader>
      <MoviesTable movies={cinema?.movies as Movie[]} />
    </div>
  )
}

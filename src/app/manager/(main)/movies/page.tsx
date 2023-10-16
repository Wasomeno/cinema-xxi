import { Metadata } from "next"

import { prisma } from "@/lib/prisma"
import { ManagerHeader } from "@/components/Headers/manager-header"
import { MoviesTable } from "@/components/Manager/Movies/movies-table"

export const metadata: Metadata = {
  title: "Movies",
}

export default async function MoviesPage() {
  const movies = await prisma.movie.findMany()
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll p-4">
      <ManagerHeader>Manage Movies</ManagerHeader>
      <MoviesTable movies={movies} />
    </div>
  )
}

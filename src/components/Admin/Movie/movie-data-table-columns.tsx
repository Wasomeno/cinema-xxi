"use client"

import Image from "next/image"
import { Movie } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import TableRowMenu from "@/components/table-row-menu"

export const cinemaMoviesDataTableColumns: ColumnDef<Movie>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Id",
    cell: (info) => info.getValue(),
  },
  {
    id: "image",
    accessorKey: "image_url",
    header: "Image",
    cell: (movie) => (
      <div className="flex items-center justify-center">
        <Image
          src={movie.getValue() as string}
          alt="movie-image"
          width={90}
          height={180}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => info.getValue(),
  },
  {
    id: "menu",
    cell: ({ row }) => (
      <TableRowMenu>
        <TableRowMenu.Link
          href={`/admin/movies?id=${row.original.id}&view=true`}
        >
          View Movie
        </TableRowMenu.Link>
      </TableRowMenu>
    ),
  },
]

"use client"

import { Prisma } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import TableRowMenu from "@/components/table-row-menu"

export const studioShowtimesTableColumns = (
  studioId: string
): ColumnDef<
  Prisma.ShowtimeToMovieGetPayload<{
    include: { movie: true; showtime: true }
  }>
>[] => [
  { accessorKey: "id", header: "Id", cell: (info) => info.getValue() },
  {
    accessorKey: "showtime",
    header: "Showtime Hour",
    cell: ({ row }) => row.original.showtime.hour,
  },
  {
    accessorKey: "showtimeMinutes",
    header: "Showtime Minutes",
    cell: ({ row }) => row.original.showtime.minutes,
  },
  {
    accessorKey: "movieTitle",
    header: "Movie Title",
    cell: ({ row }) => row.original.movie.title,
  },
  {
    header: "Menu",
    cell: ({ row }) => (
      <TableRowMenu>
        <TableRowMenu.Link
          href={`/admin/studios/${studioId}?id=${row.original.id}&view=true`}
        >
          View Showtime
        </TableRowMenu.Link>
        <TableRowMenu.Link
          href={`/admin/studios/${studioId}?id=${row.original.id}&edit=true`}
        >
          Edit Showtime
        </TableRowMenu.Link>
      </TableRowMenu>
    ),
  },
]

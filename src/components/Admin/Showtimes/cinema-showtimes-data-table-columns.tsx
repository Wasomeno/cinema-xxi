"use client"

import { Showtime } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import TableRowMenu from "@/components/table-row-menu"

export const cinemaShowtimeDataTableColumns: ColumnDef<Showtime>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Id",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "hour",
    header: "Hour",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "minutes",
    header: "Minutes",
    cell: (info) => info.getValue(),
  },
  {
    id: "menu",
    cell: ({ row }) => (
      <TableRowMenu>
        <TableRowMenu.Link
          href={`/admin/showtimes?id=${row.original.id}&edit=true`}
        >
          Edit Showtime
        </TableRowMenu.Link>
      </TableRowMenu>
    ),
  },
]

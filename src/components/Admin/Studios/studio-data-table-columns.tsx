"use client"

import { Studio } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import TableRowMenu from "@/components/table-row-menu"

export const studioDataTableColumns: ColumnDef<Studio>[] = [
  { accessorKey: "id", header: "Id", cell: (info) => info.getValue() },
  {
    accessorKey: "studio",
    header: "Studio",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: (info) => info.getValue(),
  },
  {
    id: "menu",
    cell: ({ row }) => (
      <TableRowMenu>
        <TableRowMenu.Link href={`/admin/studios/${row.original.id}`}>
          View Studio
        </TableRowMenu.Link>
      </TableRowMenu>
    ),
  },
]

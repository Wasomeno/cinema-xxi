"use client"

import { Admin } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import TableRowMenu from "@/components/table-row-menu"

export const cinemaAdminsTableColumns: ColumnDef<Admin>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Id",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    id: "menu",
    cell: ({ row }) => (
      <TableRowMenu>
        <TableRowMenu.Link
          href={`/admin/admins?id=${row.original.id}&view=true`}
        >
          View Admin
        </TableRowMenu.Link>
        <TableRowMenu.Link
          href={`/admin/admins?id=${row.original.id}&edit=true`}
        >
          Edit Admin
        </TableRowMenu.Link>
      </TableRowMenu>
    ),
  },
]

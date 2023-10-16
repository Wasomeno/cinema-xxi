import { usePathname, useRouter } from "next/navigation"

import { TableRowDetailsModal } from "@/components/TableRowDetailsModal"

export const StudioShowtimeDetailsModal = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <TableRowDetailsModal
      title="Showtime Details"
      closeModal={() => router.replace(pathname)}
    >
      Details
    </TableRowDetailsModal>
  )
}

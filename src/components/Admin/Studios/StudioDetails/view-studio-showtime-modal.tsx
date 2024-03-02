"use client"

import { usePathname, useRouter } from "next/navigation"

import { CenteredModal } from "@/components/modal"

export const StudioShowtimeDetailsModal = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <CenteredModal
      title="Showtime Details"
      closeModal={() => router.replace(pathname)}
    >
      Details
    </CenteredModal>
  )
}

import { usePathname, useRouter } from "next/navigation"

import { CenteredModal, ModalHeader } from "@/components/modal"

export function ViewCinemaModal() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900"
    >
      <ModalHeader
        title="Cinema Details"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
    </CenteredModal>
  )
}

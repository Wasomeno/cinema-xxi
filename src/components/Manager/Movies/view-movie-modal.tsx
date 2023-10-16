import { usePathname, useRouter } from "next/navigation"

import { CenteredModal, ModalHeader } from "@/components/modal"

export function ViewMovieModal() {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-3/6"
    >
      <ModalHeader
        title="Movie Details"
        closeModal={() => router.replace(pathname)}
      />
    </CenteredModal>
  )
}

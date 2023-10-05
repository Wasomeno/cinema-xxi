import { useRouter } from "next/router"
import { useSkeleton } from "hooks/useSkeleton"
import { HiCheck } from "react-icons/hi2"

import { CenteredModal, ModalHeader } from "@/components/Modal"
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions"

const RegionListModal = ({ setSelectedRegion, toggleShowRegionList }) => {
  const allRegion = useAllRegions()
  const skeletons = useSkeleton(
    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-600" />,
    5
  )

  const router = useRouter()

  const regionId = parseInt(router.query.region ?? "1")

  return (
    <CenteredModal
      closeModal={toggleShowRegionList}
      className="h-72 bg-slate-50 p-4 px-6 py-4 dark:bg-slate-800 lg:h-4/6 lg:w-2/6 "
    >
      <ModalHeader
        title="Region List"
        className="mb-4"
        closeModal={toggleShowRegionList}
      />
      <div className="flex flex-col items-center gap-2 overflow-y-scroll">
        {allRegion.isLoading && skeletons.map((skeleton) => skeleton)}

        {!allRegion.isLoading && allRegion.status !== "error"
          ? allRegion.data?.map((region) => (
              <button
                key={region.id}
                onClick={() => {
                  setSelectedRegion(region)
                  toggleShowRegionList()
                  router.replace(`${router.pathname}?region=${region.id}`)
                }}
                className="relative flex w-full cursor-pointer justify-center rounded-lg bg-slate-200 p-2 text-sm tracking-wide dark:bg-slate-700"
              >
                {regionId === region.id && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <HiCheck />
                  </span>
                )}

                <span className="text-xs lg:text-sm">{region.name}</span>
              </button>
            ))
          : null}
      </div>
    </CenteredModal>
  )
}

export default RegionListModal

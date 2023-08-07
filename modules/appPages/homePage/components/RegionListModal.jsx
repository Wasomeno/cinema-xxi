import { useSkeleton } from "hooks/useSkeleton"
import { HiCheck, HiXMark } from "react-icons/hi2"

import AnimatedContainer from "@/components/AnimatedContainer"
import { CenteredModalContainer } from "@/components/ModalContainer"
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions"

const RegionListModal = ({
  selectedRegion,
  setSelectedRegion,
  toggleShowRegionList,
}) => {
  const allRegion = useAllRegions()
  const skeletons = useSkeleton(
    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-700" />,
    5
  )
  return (
    <CenteredModalContainer
      title="Region List"
      closeModal={toggleShowRegionList}
      className="lg:h-4/6 lg:w-2/6"
    >
      <div className="flex flex-col items-center gap-2 overflow-y-scroll">
        {allRegion.isLoading && skeletons.map((skeleton) => skeleton)}
        {!allRegion.isLoading && allRegion.status !== "error"
          ? allRegion.data?.map((region) => (
              <div
                key={region.id}
                onClick={() => {
                  setSelectedRegion(region)
                  toggleShowRegionList()
                }}
                className="relative flex w-full cursor-pointer justify-center rounded-lg bg-slate-200 p-2 text-sm tracking-wide dark:bg-slate-600"
              >
                {selectedRegion.id === region.id && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <HiCheck />
                  </span>
                )}

                <span className="text-xs lg:text-sm">{region.name}</span>
              </div>
            ))
          : null}
      </div>
    </CenteredModalContainer>
  )
}

export default RegionListModal

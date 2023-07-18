import { useSkeleton } from "hooks/useSkeleton";
import { HiCheck, HiXMark } from "react-icons/hi2";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions";

const RegionListModal = ({
  selectedRegion,
  setSelectedRegion,
  toggleShowRegionList,
}) => {
  const allRegion = useAllRegions();

  const skeletons = useSkeleton(
    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-300" />,
    5
  );
  return (
    <ModalContainer closeModal={toggleShowRegionList}>
      <AnimatedContainer className="fixed bottom-0 z-20 h-96 w-full rounded-t-lg bg-slate-100 px-6 py-4 dark:bg-slate-800 lg:left-1/2 lg:top-1/2 lg:h-4/6 lg:w-2/6 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg">
        <div className="mb-4 mt-2.5 flex items-center justify-between">
          <h3 className="font-poppins text-sm lg:text-base">Region List</h3>
          <button onClick={toggleShowRegionList}>
            <HiXMark size="22" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 overflow-y-scroll">
          {allRegion.isLoading && skeletons.map((skeleton) => skeleton)}
          {!allRegion.isLoading && allRegion.status !== "error"
            ? allRegion.data?.map((region) => (
                <div
                  key={region.id}
                  onClick={() => {
                    setSelectedRegion(region);
                    toggleShowRegionList();
                  }}
                  className="relative flex w-full cursor-pointer justify-center rounded-lg bg-slate-200 p-2 text-sm tracking-wide"
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
      </AnimatedContainer>
    </ModalContainer>
  );
};

export default RegionListModal;

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions";

const RegionListModal = ({ setSelectedRegion, toggleShowRegionList }) => {
  const allRegion = useAllRegions();
  return (
    <>
      <AnimatedContainer
        className="z-15 fixed left-0 bottom-0 h-screen w-screen bg-black bg-opacity-70"
        onClick={toggleShowRegionList}
      />
      <AnimatedContainer className="fixed bottom-0 z-20 h-96 w-full rounded-t-lg bg-slate-100 p-4 dark:bg-slate-800 lg:top-1/2 lg:left-1/2 lg:h-4/6 lg:w-4/6 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg">
        <div className="my-4 text-center">
          <p className="font-poppins text-sm">Region List</p>
        </div>
        <DataContainer
          loading={allRegion.isLoading}
          object="region"
          className="flex flex-col items-center justify-start gap-3"
        >
          {allRegion.data?.map((region) => (
            <button
              key={region.id}
              onClick={() => {
                toggleShowRegionList();
                setSelectedRegion(region);
              }}
              className="w-5/6 rounded-md bg-gray-200 p-3 font-poppins text-xs shadow-sm backdrop-blur-sm dark:bg-gray-700 lg:w-4/6"
            >
              {region.name}
            </button>
          ))}
        </DataContainer>
      </AnimatedContainer>
    </>
  );
};

export default RegionListModal;

import DataContainer from "@/components/DataContainer";
import EllipsisVertical from "@/components/Icons/EllipsisVertical";
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions";
import { Subtitle } from "@/components/shared/Texts";
import useToggle from "hooks/useToggle";
import { ManagerRegionMenu } from "./ManagerRegionMenu";

import RegionListCard from "./RegionListCard";

const RegionList = () => {
  const allRegions = useAllRegions();
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <div className="w-full lg:w-5/6">
      <div className="my-2 flex items-center justify-between">
        <div className="w-2/6">
          <Subtitle size="xs">List of Movies</Subtitle>
        </div>
        <div className="relative">
          <button
            className=" h-8 w-8 rounded-full bg-slate-100 shadow-md"
            onClick={toggleShowMenu}
          >
            <EllipsisVertical />
          </button>
          {showMenu && <ManagerRegionMenu />}
        </div>
      </div>
      <div className="my-1 mb-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="font-poppins w-2/12 text-center text-xs text-slate-500 lg:w-1/12">
          Id
        </p>
        <p className="font-poppins w-4/12 text-center text-xs text-slate-500 lg:w-3/12">
          Name
        </p>
        <p className="font-poppins w-2/12 text-center text-xs text-slate-500 lg:w-2/12">
          Cinema Amount
        </p>
      </div>
      <DataContainer
        loading={allRegions.isLoading}
        object="regions"
        className="mt-3 flex h-5/6 flex-col items-center justify-start gap-3"
      >
        {allRegions.data?.length < 1 ? (
          <p className="font-poppins text-xs font-medium">No active regions</p>
        ) : (
          allRegions.data?.map((region) => (
            <RegionListCard
              key={region.id}
              regionId={region.id}
              regionName={region.name}
              regionCinemaAmount={region.cinemaAmount}
            />
          ))
        )}
      </DataContainer>
    </div>
  );
};

export default RegionList;

import { AnimatePresence } from "framer-motion";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import dynamic from "next/dynamic";

import DataContainer from "@/components/DataContainer";
import { deleteRegion } from "@/components/reactQuery/mutations/Region/deleteRegion";
import { useAllRegions } from "@/components/reactQuery/queries/Region/useAllRegions";

import RegionListCard from "./RegionListCard";

const RegionList = ({ deleteMode, toggleDeleteMode }) => {
  const regions = useAllRegions();
  const [regionsToDelete, selectRegionsToDelete, deselectRegionsToDelete] =
    useSelectDeselect([]);
  const deleteRegionMutation = deleteRegion({ regionIds: regionsToDelete });

  const DeleteModal = dynamic(() => import("@/components/DeleteModal"));

  return (
    <>
      <div className="my-1 mb-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="w-2/12 text-center font-poppins text-xs text-slate-500 lg:w-1/12">
          Id
        </p>
        <p className="w-4/12 text-center font-poppins text-xs text-slate-500 lg:w-3/12">
          Name
        </p>
        <p className="w-2/12 text-center font-poppins text-xs text-slate-500 lg:w-2/12">
          Cinema Amount
        </p>
      </div>
      <DataContainer
        loading={regions.isLoading}
        object="regions"
        className="mt-3 flex h-5/6 flex-col items-center justify-start gap-3"
      >
        {regions.data?.length < 1 ? (
          <div className="flex h-72 items-center justify-center">
            <p className="font-poppins text-xs font-medium">
              No active regions
            </p>
          </div>
        ) : (
          regions.data?.map((region) => (
            <RegionListCard
              key={region.id}
              region={region}
              deleteMode={deleteMode}
              deselectRegionsToDelete={deselectRegionsToDelete}
              selectRegionsToDelete={selectRegionsToDelete}
              regionsToDelete={regionsToDelete}
            />
          ))
        )}
      </DataContainer>
      <AnimatePresence>
        {deleteMode && (
          <DeleteModal
            deleteMutation={deleteRegionMutation.mutate}
            object="region"
            toggleDeleteMode={toggleDeleteMode}
            objectToDelete={regionsToDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RegionList;

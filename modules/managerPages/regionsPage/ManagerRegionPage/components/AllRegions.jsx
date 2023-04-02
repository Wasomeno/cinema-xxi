import { AnimatePresence } from "framer-motion";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import dynamic from "next/dynamic";

import { deleteRegion } from "@/components/reactQuery/mutations/Region/deleteRegion";
import { Paragraph } from "@/components/shared/Texts";

import RegionListCard from "./RegionListCard";

const DeleteModal = dynamic(() => import("@/components/DeleteModal"));

const AllRegions = ({ regions, deleteMode, toggleDeleteMode }) => {
  const [regionsToDelete, selectRegionsToDelete, deselectRegionsToDelete] =
    useSelectDeselect([]);

  // if (regions.isLoading)
  //   return (
  //     <div className="flex h-80 w-full flex-col items-center justify-center gap-4">
  //       <p className="font-poppins text-xs">Fetching all regions</p>
  //       <MoonLoader
  //         loading={regions.isLoading}
  //         size="30"
  //         color="black"
  //         speedMultiplier={0.75}
  //       />
  //     </div>
  //   );

  if (regions.length < 1)
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Paragraph size="sm">No active region</Paragraph>
      </div>
    );

  return (
    <>
      <div className="my-1 mb-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="w-2/12 text-center font-poppins text-xs text-slate-500 dark:text-slate-400 lg:w-1/12">
          Id
        </p>
        <p className="w-4/12 text-center font-poppins text-xs text-slate-500 dark:text-slate-400 lg:w-3/12">
          Name
        </p>
        <p className="w-2/12 text-center font-poppins text-xs text-slate-500 dark:text-slate-400 lg:w-2/12">
          Cinema Amount
        </p>
      </div>
      <div className="mt-3 flex h-5/6 flex-col items-center justify-start gap-3">
        {regions.map((region) => (
          <RegionListCard
            key={region.id}
            region={region}
            deleteMode={deleteMode}
            deselectRegionsToDelete={deselectRegionsToDelete}
            selectRegionsToDelete={selectRegionsToDelete}
            regionsToDelete={regionsToDelete}
          />
        ))}
      </div>
      <AnimatePresence>
        {deleteMode && (
          <DeleteModal
            deleteMutation={() =>
              deleteRegion({ regionIds: regionsToDelete }).mutate()
            }
            object="region"
            toggleDeleteMode={toggleDeleteMode}
            objectToDelete={regionsToDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AllRegions;

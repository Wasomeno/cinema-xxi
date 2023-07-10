import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import { useReducer } from "react";

import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerLayout } from "@/components/Layouts/ManagerLayout";
import { AddRegionModal } from "@/components/Manager/Regions/AddRegionModal";
import { AllRegionsTable } from "@/components/Manager/Regions/AllRegionsTable";
import { DeleteRegionsModal } from "@/components/Manager/Regions/DeleteRegionsModal";
import { EditRegionModal } from "@/components/Manager/Regions/EditRegionModal";

const regionDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

const Regions = () => {
  const [state, dispatch] = useReducer(cinemaReducer, regionDefaultState);
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll rounded-lg border bg-slate-50 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:border-slate-500 dark:bg-slate-700">
      <ManagerHeader>Manage Regions</ManagerHeader>
      <AllRegionsTable dispatch={dispatch} />
      <AnimatePresence>
        {state.showAddModal && (
          <AddRegionModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {state.showEditModal && (
          <EditRegionModal
            regionDetails={state.dataDetails}
            closeModal={() => dispatch({ type: "close_edit_modal" })}
          />
        )}
        {state.showDeleteModal && (
          <DeleteRegionsModal
            closeModal={() => dispatch({ type: "close_delete_modal" })}
            selectedRegions={state.selectedData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RegionsPage() {
  return (
    <ManagerLayout pageTitle="Regions">
      <Regions />
    </ManagerLayout>
  );
}

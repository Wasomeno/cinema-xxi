import { AnimatePresence } from "framer-motion";
import { cinemaReducer } from "hooks/createReducer";
import { prisma } from "lib/prisma";
import { useReducer } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerLayout } from "@/components/Layouts/ManagerLayout";
import { AddCinemaModal } from "@/components/Manager/Cinemas/AddCinemaModal";
import { DeleteCinemasModal } from "@/components/Manager/Cinemas/DeleteCinemasModal";
import { RegionCinemasTable } from "@/components/Manager/Cinemas/RegionCinemasTable";
import { RegionChartSection } from "@/components/Manager/Regions/RegionChartSection";

export async function getStaticPaths() {
  const regions = await prisma.region.findMany();
  const regionParams = regions.map((region) => ({
    params: { regionId: region.id.toString() },
  }));
  return { paths: regionParams, fallback: true };
}

export async function getStaticProps(context) {
  const { params } = context;
  const regionDetails = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
  });
  return { props: { regionDetails: regionDetails } };
}

const regionDetailsDefaultState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showDetailsModal: false,
  selectedData: [],
  dataDetails: {},
};

const RegionDetails = ({ regionDetails }) => {
  const [state, dispatch] = useReducer(
    cinemaReducer,
    regionDetailsDefaultState
  );

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll rounded-lg border bg-slate-50 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-slate-700">
      <ManagerHeader withBackButton>{regionDetails.name}</ManagerHeader>
      <AnimatedContainer className="flex justify-center">
        <div className="w-full">
          <RegionChartSection region={regionDetails.id} />
          <RegionCinemasTable regionId={regionDetails.id} dispatch={dispatch} />
        </div>
      </AnimatedContainer>
      <AnimatePresence>
        {state.showAddModal && (
          <AddCinemaModal
            closeModal={() => dispatch({ type: "close_add_modal" })}
          />
        )}
        {state.showDeleteModal && (
          <DeleteCinemasModal
            regionId={regionDetails.id}
            closeModal={() => dispatch({ type: "close_delete_modal" })}
            selectedCinemas={state.selectedData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RegionDetailsPage({ regionDetails }) {
  return (
    <ManagerLayout pageTitle={`Regions - ${regionDetails.name}`}>
      <RegionDetails regionDetails={regionDetails} />
    </ManagerLayout>
  );
}

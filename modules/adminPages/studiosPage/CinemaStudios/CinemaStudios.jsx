import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";

import { AddStudioModal } from "./components/AddStudioModal";
import { DeleteStudioModal } from "./components/DeleteStudioModal";
import { EditStudioModal } from "./components/EditStudioModal";
import { StudioTable } from "./components/StudioTable";

export const CinemaStudios = () => {
  const [selectedStudios, setSelectedStudios] = useState([]);
  const { query, push } = useRouter();
  return (
    <div className="flex flex-1 flex-col bg-white rounded-lg border p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Studios</AdminHeader>
      <StudioTable
        selectedStudios={selectedStudios}
        setSelectedStudios={setSelectedStudios}
      />
      <AnimatePresence>
        {query.add && (
          <AddStudioModal closeModal={() => push("/admin/studios")} />
        )}
        {query.edit && <EditStudioModal />}
        {query.delete && (
          <DeleteStudioModal
            selectedStudio={state.selectedData}
            closeModal={() => push("/admin/studios")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

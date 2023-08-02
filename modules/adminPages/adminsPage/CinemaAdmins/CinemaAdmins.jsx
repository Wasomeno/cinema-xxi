import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import AdminHeader from "@/components/Headers/AdminHeader";

import { AddCinemaAdminModal } from "./components/AddCinemaAdminModal";
import { CinemaAdminsTable } from "./components/CinemaAdminsTable";
import { DeleteCinemaAdminsModal } from "./components/DeleteCinemaAdminsModal";
import { EditCinemaAdminModal } from "./components/EditCinemaAdminModal";

export const CinemaAdmins = () => {
  const { query, push } = useRouter();
  return (
    <div className="flex flex-1 flex-col rounded-lg border bg-white p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Admins</AdminHeader>
      <CinemaAdminsTable />
      <AnimatePresence>
        {query.add && (
          <AddCinemaAdminModal closeModal={() => push("/admin/admins")} />
        )}
        {query.edit && <EditCinemaAdminModal />}
        {query.delete && (
          <DeleteCinemaAdminsModal
            closeModal={() => push("/admin/admins")}
            selectedAdmins={state.selectedData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

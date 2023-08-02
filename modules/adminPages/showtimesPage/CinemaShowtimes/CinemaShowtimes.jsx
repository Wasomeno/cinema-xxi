import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import AdminHeader from "@/components/Headers/AdminHeader";
import TableRowMenu from "@/components/TableRowMenu";

import { ShowtimesTable } from "./components/ShowtimesTable";

const AddCinemaShowtimeModal = dynamic(
  async () =>
    (await import("./components/AddCinemaShowtimeModal")).AddCinemaShowtimeModal
);

const EditCinemaShowtimeModal = dynamic(
  async () =>
    (await import("./components/EditCinemaShowtimeModal"))
      .EditCinemaShowtimeModal
);

const DeleteShowtimeModal = dynamic(
  async () =>
    (await import("./components/DeleteShowtimeModal")).DeleteShowtimeModal
);

export const CinemaShowtimes = () => {
  const [selectedShowtimes, setSelectedShowtimes] = useState([]);
  const router = useRouter();
  return (
    <div className="flex flex-col w-full rounded-lg border bg-white p-4 dark:border-slate-500 dark:bg-slate-700">
      <AdminHeader>Showtimes</AdminHeader>
      <ShowtimesTable
        selectedShowtimes={selectedShowtimes}
        setSelectedShowtimes={setSelectedShowtimes}
        rowMenu={(row) => (
          <TableRowMenu>
            <TableRowMenu.Button
              onClick={() =>
                router.push(`/admin/showtimes?id=${row.original.id}&edit=true`)
              }
            >
              Edit Showtime
            </TableRowMenu.Button>
          </TableRowMenu>
        )}
      />
      <AnimatePresence>
        {router.query.add && (
          <AddCinemaShowtimeModal
            closeModal={() => router.push("/admin/showtimes")}
          />
        )}
        {router.query.edit && (
          <EditCinemaShowtimeModal
            closeModal={() => router.push("/admin/showtimes")}
          />
        )}
        {router.query.delete && (
          <DeleteShowtimeModal
            closeModal={() => router.push("/admin/showtimes")}
            selectedShowtimes={state.selectedDatas}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

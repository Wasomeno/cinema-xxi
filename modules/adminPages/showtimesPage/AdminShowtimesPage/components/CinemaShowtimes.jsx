import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";
import { AnimatePresence } from "framer-motion";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";

import DataContainer from "@/components/DataContainer";
import { deleteShowtimes } from "@/components/reactQuery/mutations/Cinema/deleteShowtimes";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph } from "@/components/shared/Texts";

import CinemaShowtimesMenu from "./CinemaShowtimesMenu";

const DeleteModal = dynamic(() => import("@/components/DeleteModal"));

const CinemaShowtimes = ({ showMenu, toggleShowMenu }) => {
  const adminDetails = useAdminDetailsContext();
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  const cinemaShowtimes = useCinemaShowTimes(adminDetails?.cinema);
  const [
    showtimesToDelete,
    selectShowtimesToDelete,
    deselectShowtimesToDelete,
  ] = useSelectDeselect([]);

  return (
    <>
      <div className="my-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="w-2/12 text-center font-poppins text-xs text-slate-500 lg:w-1/12">
          Id
        </p>
        <p className="w-3/12 text-center font-poppins text-xs text-slate-500 lg:w-2/12">
          Showtime
        </p>
        <p className="w-3/12 text-center font-poppins text-xs text-slate-500 lg:w-2/12">
          Added On
        </p>
      </div>
      <DataContainer
        className="flex w-full flex-col items-center justify-start gap-3"
        object="showtimes"
        loading={cinemaShowtimes.isLoading}
      >
        {cinemaShowtimes.data?.length < 1 ? (
          <div className="flex h-72 items-center justify-center">
            <Paragraph margin="4" style="medium" size="sm">
              No Active Showtimes
            </Paragraph>
          </div>
        ) : (
          cinemaShowtimes.data?.map((showtime) => (
            <button
              key={showtime.id}
              onClick={() =>
                deleteMode && selectShowtimesToDelete(showtime.time)
              }
              className={
                (showtimesToDelete.includes(showtime.time) &&
                  deleteMode &&
                  "bg-red-300") +
                " flex h-10 w-full items-center justify-evenly rounded-lg bg-slate-100 p-2 shadow-md"
              }
            >
              <div className="w-2/12 text-center lg:w-1/12">
                <p className="font-poppins text-xs lg:text-sm">{showtime.id}</p>
              </div>
              <div className="w-3/12 text-center lg:w-2/12">
                <p className="font-poppins text-xs lg:text-sm">
                  {showtime.time}
                </p>
              </div>
              <div className="w-3/12 text-center lg:w-2/12">
                <p className="font-poppins text-xs lg:text-sm">Added On</p>
              </div>
            </button>
          ))
        )}
      </DataContainer>
      <AnimatePresence>
        {deleteMode && (
          <DeleteModal
            object="showtimes"
            objectToDelete={showtimesToDelete}
            toggleDeleteMode={toggleDeleteMode}
            deleteMutation={() =>
              deleteShowtimes({
                cinemaId: 2,
                showtimes: showtimesToDelete,
              }).mutate()
            }
          />
        )}
        {showMenu && (
          <CinemaShowtimesMenu
            toggleDeleteMode={toggleDeleteMode}
            toggleShowMenu={toggleShowMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CinemaShowtimes;

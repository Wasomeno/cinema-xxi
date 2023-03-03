import { useSelectDeselect } from "hooks/useSelectDeselect";
import useToggle from "hooks/useToggle";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import DataContainer from "@/components/DataContainer";
import { DeleteModal } from "@/components/DeleteModal";
import { deleteShowtimes } from "@/components/reactQuery/mutations/Cinema/deleteShowtimes";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph } from "@/components/shared/Texts";

import CinemaShowtimesMenu from "./CinemaShowtimesMenu";

const CinemaShowtimes = () => {
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  const cinemaShowtimes = useCinemaShowTimes();
  const [
    showtimesToDelete,
    selectShowtimesToDelete,
    deselectShowtimesToDelete,
  ] = useSelectDeselect([]);

  const deleteShowtimesMutation = deleteShowtimes({
    cinemaId: 2,
    showtimes: showtimesToDelete,
  });

  return (
    <div className="my-4 flex justify-center">
      <div className="w-full p-2 lg:w-5/6">
        <AdminSubHeader
          SubHeaderMenu={CinemaShowtimesMenu}
          object="showtimes"
          toggleDeleteMode={toggleDeleteMode}
        />
        <div className="my-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
          <p className="font-poppins w-2/12 text-center text-xs text-slate-500 lg:w-1/12">
            Id
          </p>
          <p className="font-poppins w-3/12 text-center text-xs text-slate-500 lg:w-2/12">
            Showtime
          </p>
          <p className="font-poppins w-3/12 text-center text-xs text-slate-500 lg:w-2/12">
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
                onClick={() =>
                  deleteMode && selectShowtimesToDelete(showtime.time)
                }
                key={showtime.id}
                className={
                  (showtimesToDelete.includes(showtime.time) &&
                    deleteMode &&
                    "bg-red-300") +
                  " flex h-10 w-full items-center justify-evenly rounded-lg bg-slate-100 p-2 shadow-md"
                }
              >
                <div className="w-2/12 text-center lg:w-1/12">
                  <p className="font-poppins text-xs lg:text-sm">
                    {showtime.id}
                  </p>
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
        {deleteMode && (
          <DeleteModal
            object="showtimes"
            objectToDelete={showtimesToDelete}
            toggleDeleteMode={toggleDeleteMode}
            deleteMutation={deleteShowtimesMutation.mutate}
          />
        )}
      </div>
    </div>
  );
};

export default CinemaShowtimes;

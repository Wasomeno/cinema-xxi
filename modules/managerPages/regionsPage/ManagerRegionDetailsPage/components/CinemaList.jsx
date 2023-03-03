import { AnimatePresence } from "framer-motion";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import { useRouter } from "next/router";

import { Subtitle } from "@/components/shared/Texts";

import { DeleteCinemaModal } from "./DeleteCinemaModal";

const CinemaList = ({ deleteMode, toggleDeleteMode, cinemas, region }) => {
  const [cinemasToDelete, selectCinemasToDelete, deselectCinemasToDelete] =
    useSelectDeselect([]);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="my-2 w-2/6 border-b-2 border-b-blue-600 py-1">
          <Subtitle size="xs">Cinema List</Subtitle>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          {cinemas?.length < 1 ? (
            <div className="flex h-80 items-center">
              <p className="font-poppins text-sm">No active cinemas</p>
            </div>
          ) : (
            cinemas?.map((cinema) => (
              <button
                key={cinema.id}
                onClick={() =>
                  deleteMode
                    ? selectCinemasToDelete(cinema.id)
                    : router.push("/manager/region/" + region + "/" + cinema.id)
                }
                className={
                  (cinemasToDelete.includes(cinema.id) &&
                    deleteMode &&
                    "bg-red-300 ") +
                  "flex h-16 w-full items-center justify-center rounded-md bg-slate-200 p-2 shadow-md"
                }
              >
                <p className="font-poppins text-sm font-medium">
                  {cinema.name}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
      <AnimatePresence>
        {deleteMode && (
          <DeleteCinemaModal
            cinemasToDelete={cinemasToDelete}
            toggleDeleteMode={toggleDeleteMode}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CinemaList;

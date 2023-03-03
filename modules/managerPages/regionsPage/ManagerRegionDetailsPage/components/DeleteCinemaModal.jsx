import { AnimatePresence } from "framer-motion";

import AnimatedContainer from "@/components/AnimatedContainer";
import { deleteCinema } from "@/components/reactQuery/mutations/Cinema/deleteCinema";

export const DeleteCinemaModal = ({ toggleDeleteMode, cinemasToDelete }) => {
  const deleteCinemaMutation = deleteCinema({ cinemaIds: cinemasToDelete });
  return (
    <AnimatedContainer className="fixed left-1/2 bottom-20 z-50 flex w-4/6 -translate-x-1/2 flex-col items-center justify-center gap-3 rounded-md bg-gradient-to-br from-red-300 via-red-200 to-red-100 p-3 px-4 shadow-md">
      <p className="font-poppins text-center text-xs font-medium">
        Select cinemas you want to delete
      </p>
      <p className="font-poppins text-xs font-medium">
        {cinemasToDelete.length} Cinemas Selected
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            toggleDeleteMode();
            deleteCinemaMutation.mutate();
          }}
          className="rounded-md bg-red-400 p-2 px-3 text-xs"
        >
          Delete
        </button>
        <button
          onClick={toggleDeleteMode}
          className="rounded-md bg-slate-100 p-2 px-3 text-xs"
        >
          Cancel
        </button>
      </div>
    </AnimatedContainer>
  );
};

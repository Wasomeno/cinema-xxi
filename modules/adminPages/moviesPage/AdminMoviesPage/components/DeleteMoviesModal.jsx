import AnimatedContainer from "@/components/AnimatedContainer";
import { deleteCinemaMovies } from "@/components/reactQuery/mutations/Cinema/deleteCinemaMovies";

const DeleteMoviesModal = ({ objectToDelete, object, toggleDeleteMode }) => {
  const deleteMovieMutation = deleteCinemaMovies({
    cinemaId: 2,
    movieIds: objectToDelete,
  });

  return (
    <AnimatedContainer className="fixed left-1/2 bottom-20 z-50 flex w-4/6 -translate-x-1/2 flex-col items-center justify-center gap-3 rounded-md bg-gradient-to-br from-red-300 via-red-200 to-red-100 p-3 px-4 shadow-md lg:w-2/6">
      <p className="text-center font-poppins text-xs font-medium lg:text-sm">
        Select {object} you want to delete
      </p>
      <p className="font-poppins text-xs font-medium lg:text-sm">
        {objectToDelete.length} {object} Selected
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            toggleDeleteMode();
            deleteMovieMutation.mutate();
          }}
          className="rounded-md bg-red-400 p-2 px-3 text-xs lg:text-sm"
        >
          Delete
        </button>
        <button
          onClick={toggleDeleteMode}
          className="rounded-md bg-slate-100 p-2 px-3 text-xs lg:text-sm"
        >
          Cancel
        </button>
      </div>
    </AnimatedContainer>
  );
};

export default DeleteMoviesModal;

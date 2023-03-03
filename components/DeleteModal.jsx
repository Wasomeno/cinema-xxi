import AnimatedContainer from "./AnimatedContainer";

export const DeleteModal = ({
  deleteMutation,
  objectToDelete,
  object,
  toggleDeleteMode,
}) => {
  return (
    <AnimatedContainer className="fixed left-1/2 bottom-20 z-50 flex w-4/6 -translate-x-1/2 flex-col items-center justify-center gap-3 rounded-md bg-gradient-to-br from-red-300 via-red-200 to-red-100 p-3 px-4 shadow-md lg:w-2/6">
      <p className="font-poppins text-center text-xs font-medium lg:text-sm">
        Select {object} you want to delete
      </p>
      <p className="font-poppins text-xs font-medium lg:text-sm">
        {objectToDelete.length} {object} Selected
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            toggleDeleteMode();
            deleteMutation();
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

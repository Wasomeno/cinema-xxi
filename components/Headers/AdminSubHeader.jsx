import EllipsisVertical from "../Icons/EllipsisVertical";

export const AdminSubHeader = ({ toggleShowMenu, children }) => {
  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <div className="w-2/6">
          <p className="font-poppins text-xs font-medium lg:text-sm">
            {children}
          </p>
        </div>
        <span className="relative">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 shadow-md dark:bg-slate-700"
            onClick={toggleShowMenu}
          >
            <EllipsisVertical
              size="5"
              color="stroke-slate-800 dark:stroke-slate-50"
            />
          </button>
        </span>
      </div>
    </>
  );
};

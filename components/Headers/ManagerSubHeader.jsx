import EllipsisVertical from "../Icons/EllipsisVertical";

export const ManagerSubHeader = ({ toggleShowMenu, children }) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="w-2/6">
        <p className="font-poppins text-xs lg:text-sm">{children}</p>
      </div>
      <span className="relative">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 shadow-md dark:bg-slate-600"
          onClick={toggleShowMenu}
        >
          <EllipsisVertical
            color="stroke-slate-800 dark:stroke-slate-50"
            size="5"
          />
        </button>
      </span>
    </div>
  );
};

import useToggle from "hooks/useToggle";

import EllipsisVertical from "./Icons/EllipsisVertical";

export const ManagerSubHeader = ({
  SubHeaderMenu,
  toggleDeleteMode,
  object,
}) => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <div className="w-2/6">
          <p className="font-poppins text-xs font-medium lg:text-sm">
            List of {object}
          </p>
        </div>
        <span className="relative">
          <button
            className="relative z-30 h-8 w-8 rounded-full bg-slate-100 shadow-md"
            onClick={toggleShowMenu}
          >
            <EllipsisVertical />
          </button>
          {showMenu && (
            <SubHeaderMenu
              toggleShowMenu={toggleShowMenu}
              toggleDeleteMode={toggleDeleteMode}
            />
          )}
        </span>
      </div>
    </>
  );
};

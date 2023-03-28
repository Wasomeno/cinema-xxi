import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/Headers/ManagerSubHeader";

import AllRegions from "./components/AllRegions";

const ManagerRegionMenu = dynamic(() =>
  import("./components/ManagerRegionMenu")
);

export const ManagerRegionPage = () => {
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  const [showMenu, toggleShowMenu] = useToggle(false);

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll bg-opacity-95  p-4 dark:bg-slate-800">
      <ManagerDashboardHeader>Manage Regions</ManagerDashboardHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <ManagerSubHeader toggleShowMenu={toggleShowMenu}>
            Region list
          </ManagerSubHeader>
          <AllRegions
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <ManagerRegionMenu
            toggleShowMenu={toggleShowMenu}
            toggleDeleteMode={toggleDeleteMode}
          />
        )}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

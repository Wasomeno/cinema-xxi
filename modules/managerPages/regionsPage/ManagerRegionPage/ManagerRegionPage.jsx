import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/ManagerSubHeader";

import RegionList from "./components/RegionList";

export const ManagerRegionPage = () => {
  const [deleteMode, toggleDeleteMode] = useToggle(false);

  const ManagerRegionMenu = dynamic(() =>
    import("./components/ManagerRegionMenu")
  );

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <ManagerDashboardHeader>Manage Regions</ManagerDashboardHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <ManagerSubHeader
            object="movies"
            toggleDeleteMode={toggleDeleteMode}
            SubHeaderMenu={ManagerRegionMenu}
          />
          <RegionList
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

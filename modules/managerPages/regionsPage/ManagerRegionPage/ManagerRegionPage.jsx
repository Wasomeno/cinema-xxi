import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";

import RegionList from "./components/RegionList";

export const ManagerRegionPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerDashboardHeader>Manage Regions</ManagerDashboardHeader>
      <div className="flex justify-center">
        <RegionList />
      </div>
    </AnimatedContainer>
  );
};

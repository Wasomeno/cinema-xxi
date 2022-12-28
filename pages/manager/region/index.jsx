import React from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../components/Manager/ManagerDashboardHeader";
import RegionList from "../../../components/Manager/Region/RegionList";
import { RegionManagerMenu } from "../../../components/Manager/Region/RegionManagerMenu";

const ManageRegions = () => {
  return (
    <AnimatedContainer className="w-full h-full p-4">
      <ManagerDashboardHeader
        title="Manage Regions"
        withOption
        OptionMenu={RegionManagerMenu}
      />
      <RegionList />
    </AnimatedContainer>
  );
};

export default ManageRegions;

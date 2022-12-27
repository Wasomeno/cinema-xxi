import React from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../components/Manager/ManagerDashboardHeader";

const ManageMovies = () => {
  return (
    <AnimatedContainer className="w-full h-full p-4">
      <ManagerDashboardHeader title="Manage Movies" />
      *//1. add tab menus for managing the cinemas (list, update, delete,
      details, search); *//2. add tab bodies for all those menus
    </AnimatedContainer>
  );
};

export default ManageMovies;

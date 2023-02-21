import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";

export const ManagerDashboardPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader>Dashboard</ManagerHeader>
      <div className="mt-4 h-4/6 rounded-md bg-slate-400" />
    </AnimatedContainer>
  );
};

import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";

export const ManagerDashboardPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader>Dashboard</ManagerHeader>
      <div className="flex h-full justify-center">
        <div className="mt-4 h-5/6 w-full rounded-md  bg-slate-400 lg:w-5/6" />
      </div>
    </AnimatedContainer>
  );
};

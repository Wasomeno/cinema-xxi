import React from "react";
import AnimatedContainer from "../../components/AnimatedContainer";
import { useUserDetails } from "../../hooks/useUserDetails";

const Manager = () => {
  const { user, isReconnecting } = useUserDetails();
  return (
    <AnimatedContainer className="w-full h-full p-4">
      <div className="flex justify-between items-center h-16">
        <div className="w-2/6">
          <h1 className="font-poppins font-medium">Dashboard</h1>
        </div>
        <div className="w-3/6 flex justify-end gap-3 items-center">
          <div className="w-3 h-3 rounded-full bg-green-600 shadow-sm" />
          <p className="font-poppins text-sm font-medium">
            {isReconnecting ? "Connecting..." : user?.slice(0, 10)}...
          </p>
        </div>
      </div>
      <div className="h-4/6 bg-slate-400 rounded-md" />
    </AnimatedContainer>
  );
};

export default Manager;

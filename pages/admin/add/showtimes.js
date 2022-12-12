import React, { useContext, useState } from "react";
import { appContext } from "../../../context/AppContext";
import AddShowTimes from "../../../components/Admin/ShowTimes/AddShowTimes";
import CurrentShowTimes from "../../../components/Admin/ShowTimes/CurrentShowTimes";
import AddShowStudioShowTimes from "../../../components/Admin/ShowTimes/AddShowStudioShowTimes";
import AnimatedContainer from "../../../components/AnimatedContainer";

const showtimes = () => {
  const adminDetails = useContext(appContext).adminDetails;
  return (
    <AnimatedContainer className="w-full h-auto">
      <div className="text-center">
        <h1 className="font-poppins font-semibold text-2xl m-4 p-2">
          Manage Show Times
        </h1>
      </div>
      <div className="flex flex-wrap h-auto justify-center items-center">
        <div className="h-auto w-full flex flex-wrap justify-center gap-4 items-center">
          <CurrentShowTimes adminDetails={adminDetails} />
          <AddShowTimes adminDetails={adminDetails} />
          <AddShowStudioShowTimes adminDetails={adminDetails} />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default showtimes;

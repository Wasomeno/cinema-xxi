import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import CurrentShowTimes from "./components/CurrentShowTimes";

export const AdminShowtimesPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Showtimes in Cinema</AdminHeader>
      <div className="my-4 flex justify-center">
        <CurrentShowTimes region={1} cinema={1} />
      </div>
    </AnimatedContainer>
  );
};

import React, { useContext, useState } from "react";
import CurrentShowTimes from "modules/adminPages/showtimesPage/CurrentShowTimes";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Admin/AdminHeader";
import ShowTimesInCinemaMenu from "modules/adminPages/showtimesPage/ShowTimesInCinemaMenu";
import { Subtitle } from "@/components/shared/Texts";

const showtimes = () => {
  return (
    <AnimatedContainer className="p-4">
      <AdminHeader
        title="Showtimes in Cinema"
        withOption
        OptionMenu={<ShowTimesInCinemaMenu/>}
      />
      <div className="my-4">
        <Subtitle text="List of Showtimes" size="sm" />
      </div>
      <CurrentShowTimes region={1} cinema={1} />
    </AnimatedContainer>
  );
};

export default showtimes;

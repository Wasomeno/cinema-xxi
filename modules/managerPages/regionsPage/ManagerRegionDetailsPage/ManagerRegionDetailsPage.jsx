import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { useRegionDetails } from "@/components/reactQuery/queries/Region/useRegionDetails";
import { Subtitle } from "@/components/shared/Texts";

import CinemaList from "./components/CinemaList";

export const ManagerRegionDetailsPage = () => {
  const { regionId } = useRouter().query;
  const regionDetails = useRegionDetails({ region: regionId });
  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader withBackButton>{regionDetails.data.name}</ManagerHeader>
      <div className="w-full">
        <Subtitle size="sm"></Subtitle>
      </div>
      <CinemaList cinemas={regionDetails.data.cinemas} region={regionId} />
    </AnimatedContainer>
  );
};

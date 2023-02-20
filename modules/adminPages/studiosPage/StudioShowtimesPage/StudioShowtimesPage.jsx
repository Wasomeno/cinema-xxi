import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { useStudioDetails } from "@/components/reactQuery/queries/Cinema/useStudioDetails";
import { Paragraph, Subtitle } from "@/components/shared/Texts";

export const StudioShowtimesPage = () => {
  const studioDetails = useStudioDetails(1, 1, 1);
  return (
    <AnimatedContainer className="p-4">
      <AdminHeader withBackButton>Studio Showtimes</AdminHeader>
      <div className="my-4">
        <Subtitle text="List of Showtimes" size="sm" />
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4"
        object="showtimes"
        loading={false}
      >
        {studioDetails.data?.showTimes.length < 1 ? (
          <Paragraph text="No active showtimes" size="sm" />
        ) : (
          studioDetails.data?.showTimes.map((showtime, index) => (
            <Paragraph key={index} text={parseInt(showtime)} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

import AdminHeader from "@/components/Admin/AdminHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { useStudioDetails } from "@/components/reactQuery/queries/Cinema/useStudioDetails";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import ShowtimesInStudioMenu from "modules/adminPages/showtimesPage/ShowtimesInStudioMenu";
import showtimes from "pages/admin/showtimes";
import React from "react";

const StudioShowtimes = () => {
  const studioDetails = useStudioDetails(1, 1, 1);

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader
        title="Studio Showtimes"
        withBackButton
        withOption
        OptionMenu={<ShowtimesInStudioMenu studio={1} />}
      /
      <div className="my-4">
        <Subtitle text="List of Showtimes" size="sm" />
      </div>
      <DataContainer
        className="flex flex-col gap-4 justify-start items-center"
        object="showtimes"
        loading={studioDetails.isLoading}
      >
        {studioDetails.data?.showTimes.length < 1 ? (
          <Paragraph text="No active showtimes" size="sm" />
        ) : (
          studioDetails.data?.showTimes.map((showtime) => (
            <Paragraph text={parseInt(showtime)} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

export default StudioShowtimes;

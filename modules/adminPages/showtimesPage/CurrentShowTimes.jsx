import { Paragraph, Subtitle } from "@/components/shared/Texts";
import React from "react";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import DataContainer from "@/components/DataContainer";

const CurrentShowTimes = ({ region, cinema }) => {
  const cinemaShowtimes = useCinemaShowTimes({
    region: region,
    cinema: cinema,
  });

  return (
    <DataContainer
      className="flex flex-col items-center justify-start gap-4 p-2"
      object="showtimes"
      loading={cinemaShowtimes.isLoading}
    >
      {cinemaShowtimes.data?.length < 1 ? (
        <Paragraph
          text="No Active Showtimes"
          margin="4"
          style="medium"
          size="sm"
        />
      ) : (
        cinemaShowtimes.data?.map((showtime, index) => (
          <div
            key={index}
            className="bg-slate-100 text-center shadow-md p-2 rounded-lg w-2/6"
          >
            {parseInt(showtime)}
          </div>
        ))
      )}
    </DataContainer>
  );
};

export default CurrentShowTimes;

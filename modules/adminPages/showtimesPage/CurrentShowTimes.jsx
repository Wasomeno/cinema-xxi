import { query } from "@/components/reactQuery/query";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import React from "react";
import { MoonLoader } from "react-spinners";
import { useShowTimes } from "@/components/reactQuery/queries/Cinema/useShowTimes";

const CurrentShowTimes = ({ region, cinema }) => {
  const showTimes = query({
    queryKey: ["cinemaShowTimes", cinema],
    queryFunction: async () =>
      useShowTimes({
        cinema: cinema,
        region: region,
      }),
  });

  return (
    <div className="flex flex-col items-center justify-start gap-2 p-2">
      {showTimes.isLoading && (
        <div className="flex flex-col justify-center items-center">
          <Paragraph text="Fetching Showtimes" size="sm" margin="4" />
          <MoonLoader loading={showTimes.isLoading} size={25} color={"black"} />
        </div>
      )}
      {!showTimes.isLoading &&
        (showTimes.data.length < 1 ? (
          <Paragraph
            text="No Active Showtimes"
            margin="4"
            style="medium"
            size="sm"
          />
        ) : (
          showTimes.data.map((showtime, index) => (
            <div
              key={index}
              className="bg-slate-100 text-center shadow-md p-2 rounded-lg w-2/6"
            >
              {parseInt(showtime)}
            </div>
          ))
        ))}
    </div>
  );
};

export default CurrentShowTimes;

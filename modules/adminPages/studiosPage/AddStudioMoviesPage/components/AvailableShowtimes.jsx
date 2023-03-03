import { useRouter } from "next/router";

import DataContainer from "@/components/DataContainer";
import { useStudioShowTimes } from "@/components/reactQuery/queries/Cinema/useStudioShowTimes";
import { Paragraph } from "@/components/shared/Texts";

export const AvailableShowtimes = ({ selectShowtime }) => {
  const { query } = useRouter();
  const studioShowtimes = useStudioShowTimes({
    cinemaId: 2,
    studio: 2,
  });

  return (
    <div className="my-2">
      <div className="my-4">
        <Paragraph size="xs">Available Showtimes</Paragraph>
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4 p-2"
        object="showtimes"
        loading={studioShowtimes.isLoading}
      >
        {studioShowtimes.data?.showtime.length < 1 ? (
          <Paragraph size="sm">No active showtimes</Paragraph>
        ) : (
          studioShowtimes.data?.showtime.map((showtime) => (
            <div
              key={showtime.id}
              onClick={() => selectShowtime(showtime.time)}
              className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
            >
              {parseInt(showtime.time)}
            </div>
          ))
        )}
      </DataContainer>
    </div>
  );
};

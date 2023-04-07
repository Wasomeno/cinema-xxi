import { useSession } from "next-auth/react";
import { MoonLoader } from "react-spinners";

import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph } from "@/components/shared/Texts";

export const AvailableCinemaShowtimes = ({ selectShowtime }) => {
  const { data: sessionData } = useSession();
  const cinemaShowtimes = useCinemaShowTimes(sessionData.cinemaId);

  return (
    <div className="w-full">
      <div className="mb-2">
        <Paragraph size="xs">Cinema Showtimes</Paragraph>
      </div>
      <div className="flex h-40 flex-col items-center justify-start gap-4">
        {cinemaShowtimes.isLoading && (
          <>
            <p className="font-poppins text-xs">Fetching cinema showtimes</p>
            <MoonLoader
              loading={cinemaShowtimes.isLoading}
              size="25"
              color="black"
            />
          </>
        )}

        {!cinemaShowtimes.isLoading && cinemaShowtimes.data?.length < 1 && (
          <p className="font-poppins text-xs">No active showtimes</p>
        )}

        {!cinemaShowtimes.isLoading &&
          cinemaShowtimes.data?.length > 0 &&
          cinemaShowtimes.data?.map((showtime) => (
            <button
              key={showtime.id}
              onClick={() => selectShowtime(showtime)}
              className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md dark:bg-slate-700"
            >
              <Paragraph size="xs">{showtime.time}</Paragraph>
            </button>
          ))}
      </div>
    </div>
  );
};

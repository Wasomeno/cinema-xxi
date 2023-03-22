import { useAdminDetailsContext } from "context/AdminDetails/useAdminDetailsContext";

import DataContainer from "@/components/DataContainer";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph } from "@/components/shared/Texts";

export const AvailableShowtimes = ({ selectShowtime }) => {
  const adminDetails = useAdminDetailsContext();
  const cinemaShowtimes = useCinemaShowTimes(adminDetails?.cinema);
  return (
    <div className="mb-4">
      <div className="my-4">
        <Paragraph size="xs">Available Showtimes</Paragraph>
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4"
        object="showtimes"
        loading={cinemaShowtimes.isLoading}
      >
        {cinemaShowtimes.data?.length < 1 ? (
          <Paragraph size="xs">No active showtimes</Paragraph>
        ) : (
          cinemaShowtimes.data?.map((showtime) => (
            <button
              key={showtime.id}
              onClick={() => selectShowtime(showtime)}
              className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
            >
              <Paragraph size="xs">{showtime.time}</Paragraph>
            </button>
          ))
        )}
      </DataContainer>
    </div>
  );
};

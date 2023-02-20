import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import ShowtimeListCard from "@/components/ShowtimeListCard";

export const ManagerCinemaShowtimesPage = () => {
  const { regionId, cinemaId } = useRouter().query;
  const cinemaShowtimes = useCinemaShowTimes({
    region: regionId,
    cinema: cinemaId,
  });

  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader title="Showtimes" withBackButton />
      <div className="mt-5 mb-3 w-3/6">
        <p className="font-poppins text-sm font-medium text-slate-500">
          Showtimes list
        </p>
      </div>
      <DataContainer
        className="flex w-full flex-col items-center justify-start gap-4"
        loading={cinemaShowtimes.isLoading}
        object="showtimes"
      >
        {cinemaShowtimes.data?.length < 1 ? (
          <p className="font-poppins text-sm font-medium">
            No active showtimes
          </p>
        ) : (
          cinemaShowtimes.data?.map((showtime, index) => (
            <ShowtimeListCard key={index} showtime={showtime} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

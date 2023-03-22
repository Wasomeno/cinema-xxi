import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import ShowtimeListCard from "@/components/ShowtimeListCard";

export const ManagerCinemaShowtimesPage = () => {
  const { query } = useRouter();
  const cinemaShowtimes = useCinemaShowTimes(query?.cinemaId);

  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerDashboardHeader withBackButton>Showtimes</ManagerDashboardHeader>
      <div className="mt-5 mb-3 w-3/6">
        <p className="font-poppins text-xs">Showtime list</p>
      </div>
      <DataContainer
        className="flex w-full flex-col items-center justify-start gap-4"
        loading={cinemaShowtimes.isLoading}
        object="showtimes"
      >
        {cinemaShowtimes.data?.length < 1 ? (
          <p className="font-poppins text-xs font-medium">
            No active showtimes
          </p>
        ) : (
          cinemaShowtimes.data?.map((showtime, index) => (
            <ShowtimeListCard key={index} showtime={showtime.time} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

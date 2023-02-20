import React from "react";

import DataContainer from "@/components/DataContainer";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import useToggle from "hooks/useToggle";
import EllipsisVertical from "@/components/Icons/EllipsisVertical";
import ShowTimesInCinemaMenu from "./ShowTimesInCinemaMenu";

const CurrentShowTimes = ({ region, cinema }) => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  const cinemaShowtimes = useCinemaShowTimes({
    region: region,
    cinema: cinema,
  });

  return (
    <div className="w-full p-2 lg:w-5/6">
      <div className="mb-4 flex items-center justify-between">
        <div className="w-2/6">
          <Subtitle size="xs">List of Showtimes</Subtitle>
        </div>
        <div className="relative">
          <button
            className=" h-8 w-8 rounded-full bg-slate-100 shadow-md"
            onClick={toggleShowMenu}
          >
            <EllipsisVertical />
          </button>
          {showMenu && <ShowTimesInCinemaMenu />}
        </div>
      </div>
      <div className="my-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="font-poppins w-2/12 text-center text-xs text-slate-500 lg:w-1/12">
          Id
        </p>
        <p className="font-poppins w-3/12 text-center text-xs text-slate-500 lg:w-2/12">
          Showtime
        </p>
        <p className="font-poppins w-3/12 text-center text-xs text-slate-500 lg:w-2/12">
          Added On
        </p>
      </div>
      <DataContainer
        className="flex w-full flex-col items-center justify-start gap-3"
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
              className="flex h-10 w-full items-center justify-evenly rounded-lg bg-slate-100 p-2 shadow-md"
            >
              <div className="w-2/12 text-center lg:w-1/12">
                <p className="font-poppins text-xs lg:text-sm">{index + 1}</p>
              </div>
              <div className="w-3/12 text-center lg:w-2/12">
                <p className="font-poppins text-xs lg:text-sm">{showtime}</p>
              </div>
              <div className="w-3/12 text-center lg:w-2/12">
                <p className="font-poppins text-xs lg:text-sm">Added On</p>
              </div>
            </div>
          ))
        )}
      </DataContainer>
    </div>
  );
};

export default CurrentShowTimes;

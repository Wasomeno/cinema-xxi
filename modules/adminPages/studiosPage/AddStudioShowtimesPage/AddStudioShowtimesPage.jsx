import { useSelectDeselect } from "hooks/useSelectDeselect";
import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { addShowTimesToStudio } from "@/components/reactQuery/mutations/Cinema/addStudioShowTime";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph } from "@/components/shared/Texts";

const AddStudioShowtimesPage = () => {
  const { query } = useRouter();
  const cinemaShowtimes = useCinemaShowTimes({ region: 1, cinema: 1 });
  const [selectedShowtimes, selectShowtime, deselectShowtime] =
    useSelectDeselect([]);

  const addStudioShowtimeMutation = addShowTimesToStudio({
    region: 1,
    cinema: 1,
    showtimes: selectedShowtimes,
    studio: query.studio,
  });

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader title="Add Showtimes" withBackButton />
      <div className="mb-4 h-40">
        <Paragraph text="Available Showtimes" size="sm" margin="2" />
        <DataContainer
          className="flex flex-col items-center justify-start gap-4"
          object="showtimes"
          loading={cinemaShowtimes.isLoading}
        >
          {cinemaShowtimes.data?.length < 1 ? (
            <Paragraph text="No active showtimes" size="sm" />
          ) : (
            cinemaShowtimes.data?.map((showtime, index) => (
              <div
                key={index}
                onClick={() => selectShowtime(parseInt(showtime))}
                className="flex h-10 w-4/6 items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
              >
                <Paragraph text={parseInt(showtime)} size="sm" />
              </div>
            ))
          )}
        </DataContainer>
      </div>

      <div className="mb-4 h-40">
        <Paragraph text="Selected Showtimes" size="sm" margin="2" />
        <div className="flex flex-col items-center justify-start gap-4">
          {selectedShowtimes.length < 1 ? (
            <div className="flex h-20 items-center justify-center">
              <Paragraph text="No active showtimes" size="sm" />
            </div>
          ) : (
            selectedShowtimes.map((showtime, index) => (
              <div
                key={index}
                onClick={() => deselectShowtime(showtime)}
                className="flex h-10 w-4/6 items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
              >
                <Paragraph text={parseInt(showtime)} size="sm" />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => addStudioShowtimeMutation()}
          className="font-poppins w-3/6 rounded-md bg-slate-900 p-2 text-sm text-white"
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

export default AddStudioShowtimesPage;

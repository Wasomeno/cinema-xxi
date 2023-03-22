import { useRouter } from "next/router";
import React, { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { addStudioShowtimes } from "@/components/reactQuery/mutations/Cinema/addStudioShowTime";

import { AvailableShowtimes } from "./components/AvailableShowtimes";
import { SelectedShowtimes } from "./components/SelectedShowtimes";

export const AddStudioShowtimesPage = () => {
  const { query } = useRouter();

  const [selectedShowtimes, setSelectedShowtimes] = useState([]);

  function selectShowtime(showtime) {
    setSelectedShowtimes((currentSelected) => [...currentSelected, showtime]);
  }

  function deselectShowtime(id) {
    setSelectedShowtimes((currentSelected) =>
      currentSelected.filter((showtime) => id !== showtime.id)
    );
  }

  const addStudioShowtimeMutation = addStudioShowtimes({
    showtimes: selectedShowtimes,
    studioId: query?.studio,
  });

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <AdminHeader withBackButton>
        Add Studio {query.studio} Showtimes
      </AdminHeader>
      <div className="flex justify-center">
        <div className="w-5/6 lg:w-4/6">
          <AvailableShowtimes selectShowtime={selectShowtime} />
          <SelectedShowtimes
            selectedShowtimes={selectedShowtimes}
            deselectShowtime={deselectShowtime}
          />
          <div className="mt-4 text-center">
            <button
              onClick={addStudioShowtimeMutation.mutate}
              className="w-3/6 rounded-md bg-slate-900 p-2 font-poppins text-sm text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

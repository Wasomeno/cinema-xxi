import { useSelectDeselect } from "hooks/useSelectDeselect";
import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { addShowTimesToStudio } from "@/components/reactQuery/mutations/Cinema/addStudioShowTime";

import { AvailableShowtimes } from "./components/AvailableShowtimes";
import { SelectedShowtimes } from "./components/SelectedShowtimes";

export const AddStudioShowtimesPage = () => {
  const { query } = useRouter();

  const [selectedShowtimes, selectShowtime, deselectShowtime] =
    useSelectDeselect([]);

  const addStudioShowtimeMutation = addShowTimesToStudio({
    region: 1,
    cinema: 2,
    showtimes: selectedShowtimes,
    studio: query.studio,
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
              onClick={() => addStudioShowtimeMutation()}
              className="font-poppins w-3/6 rounded-md bg-slate-900 p-2 text-sm text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

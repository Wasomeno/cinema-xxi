import { useSession } from "next-auth/react";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const AddCinemaShowtimeModal = ({ closeModal }) => {
  const [hour, setHour] = useState(12);
  const [minutes, setMinutes] = useState(0);

  const { data: sessionData } = useSession();

  const sideEffects = useSideEffects({
    text: "Adding Showtimes",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData?.user.cinemaId),
  });

  const addCinemaShowtime = mutation({
    url: `/api/cinemas/${sessionData?.user.cinemaId}/showtimes`,
    method: "POST",
    body: {
      hour,
      minutes,
    },
    sideEffects,
  });

  function hourHandler(value) {
    if (value >= 22) return;
    setHour(value);
  }

  function minutesHandler(value) {
    if (value < 0 || value >= 59) return;
    setMinutes(value);
  }

  return (
    <FormModalContainer
      onSubmit={addCinemaShowtime.mutate}
      title="Add Showtime"
      closeModal={closeModal}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 lg:flex-nowrap">
        <div className="flex w-3/6 flex-col items-center gap-1">
          <span className="text-xs lg:text-sm">Hour</span>
          <input
            type="number"
            value={hour}
            onChange={(event) => hourHandler(event.target.value)}
            className="h-10 rounded-lg text-center text-lg shadow-sm lg:h-14 lg:w-4/6"
          />
        </div>
        <div className="flex w-3/6 flex-col items-center gap-1">
          <span className="text-xs lg:text-sm">Minutes</span>
          <input
            type="number"
            value={minutes}
            onChange={(event) => minutesHandler(event.target.value)}
            className="h-10 rounded-lg text-center text-lg shadow-sm lg:h-14 lg:w-4/6"
          />
        </div>
      </div>
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

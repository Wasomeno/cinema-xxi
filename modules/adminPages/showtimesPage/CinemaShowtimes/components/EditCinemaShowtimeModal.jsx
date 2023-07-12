import { useSession } from "next-auth/react";
import { useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const EditCinemaShowtimeModal = ({ showtimeDetails, closeModal }) => {
  const [hour, setHour] = useState(showtimeDetails.hour);
  const [minutes, setMinutes] = useState(showtimeDetails.minutes);

  const { data: sessionData } = useSession();

  const sideEffects = useSideEffects({
    text: "Updating showtime",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData.user.cinemaId),
  });

  const updateShowtimeMutation = mutation({
    url: `/api/cinemas/${sessionData.user.cinemaId}/showtimes`,
    method: "PUT",
    body: {
      id: showtimeDetails.id,
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
      onSubmit={updateShowtimeMutation.mutate}
      title="Edit Showtime"
      closeModal={closeModal}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm">Hour</span>
          <input
            type="number"
            value={hour}
            onChange={(event) => hourHandler(event.target.value)}
            className="h-14 rounded-lg text-center text-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm">Minutes</span>
          <input
            type="number"
            value={minutes}
            onChange={(event) => minutesHandler(event.target.value)}
            className="h-14 rounded-lg text-center text-lg shadow-sm"
          />
        </div>
      </div>
      <FormModalContainer.Submit text="Submit" />
    </FormModalContainer>
  );
};

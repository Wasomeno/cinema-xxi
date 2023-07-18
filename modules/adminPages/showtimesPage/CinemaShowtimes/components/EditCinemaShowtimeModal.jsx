import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import FormModalContainer from "@/components/FormModalContainer";
import mutation from "@/components/reactQuery/mutations/mutation";
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects";
import { query } from "@/components/reactQuery/queries/query";
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys";

export const EditCinemaShowtimeModal = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const showtime = query({
    queryKey: ["showtime", router.query?.id],
    url: `/api/cinemas/${sessionData.user.cinemaId}/showtimes/${router.query?.id}`,
  });

  const [hour, setHour] = useState();
  const [minutes, setMinutes] = useState();

  const sideEffects = useSideEffects({
    text: "Updating showtime",
    queryKeys: cinemaQueryKeys.cinemaShowtimes(sessionData.user.cinemaId),
  });

  const updateShowtimeMutation = mutation({
    url: `/api/cinemas/${sessionData.user.cinemaId}/showtimes`,
    method: "PUT",
    body: {
      id: router.query.id,
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

  useEffect(() => {
    if (!showtime.isLoading) {
      setHour(showtime.data?.hour);
      setMinutes(showtime.data?.minutes);
    }
  }, [showtime.isLoading]);

  return (
    <FormModalContainer
      onSubmit={updateShowtimeMutation.mutate}
      title="Edit Showtime"
      closeModal={() => router.back()}
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

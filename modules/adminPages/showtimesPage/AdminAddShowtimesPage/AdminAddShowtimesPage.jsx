import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { useAddCinemaShowtime } from "@/components/reactQuery/mutations/Cinema/addCinemaShowTime";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";

export const AdminAddShowtimesPage = () => {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const addShowTime = useAddCinemaShowtime({
    hour: hour,
    minutes: minutes,
  });

  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader withBackButton>Add Showtimes</AdminHeader>
      <FormContainer onSubmit={addShowTime.mutate}>
        <div className="flex w-5/6 flex-col items-center justify-center gap-2 lg:w-3/6">
          <label className="font-poppins text-xs lg:text-sm">Hour</label>
          <FormInput type="number" setValue={setHour} value={hour} />
        </div>
        <div className="flex w-5/6 flex-col items-center justify-center gap-2 lg:w-3/6">
          <label className="font-poppins text-xs lg:text-sm">Minutes</label>
          <FormInput type="number" setValue={setMinutes} value={minutes} />
        </div>
        <div className="w-3/6 sm:w-2/6 lg:w-1/6 ">
          <FormSubmit value="Submit" width="full" />
        </div>
      </FormContainer>
    </AnimatedContainer>
  );
};

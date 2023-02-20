import React, { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { addCinemaShowTime } from "@/components/reactQuery/mutations/Cinema/addCinemaShowTime";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";
import { Paragraph } from "@/components/shared/Texts";

export const AdminAddShowtimesPage = () => {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const addShowTime = addCinemaShowTime({
    region: 1,
    cinema: 1,
    hour: hour,
    minutes: minutes,
  });

  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader withBackButton>Add Showtimes</AdminHeader>
      <FormContainer onSubmit={(event) => addShowTime(event)}>
        <div className="flex flex-col items-center justify-center gap-2">
          <label className="font-poppins text-xs lg:text-sm">Hour</label>
          <FormInput type="number" setValue={setHour} value={hour} />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <label className="font-poppins text-xs lg:text-sm">Minutes</label>
          <FormInput type="number" setValue={setMinutes} value={minutes} />
        </div>
        <FormSubmit value="Submit" width="3/6" />
      </FormContainer>
    </AnimatedContainer>
  );
};

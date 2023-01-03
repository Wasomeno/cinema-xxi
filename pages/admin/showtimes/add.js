import AdminHeader from "@/components/Admin/AdminHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import { addCinemaShowTime } from "@/components/reactQuery/mutations/Cinema/addCinemaShowTime";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";
import { Paragraph } from "@/components/shared/Texts";
import React, { useState } from "react";

const add = () => {
  const [showtime, setShowtime] = useState({ hour: 0, minute: 0 });
  const addShowTime = addCinemaShowTime({
    region: 1,
    cinema: 1,
    hour: showtime.hour,
    minutes: showtime.minute,
  });

  return (
    <AnimatedContainer className="h-full p-4">
      <AdminHeader title="Add Showtimes" withBackButton />
      <FormContainer onSubmit={(event) => addShowTime(event)}>
        <div className="text-center">
          <Paragraph text="Hour" margin="2" size="sm" />
          <FormInput
            type="number"
            onChange={(event) =>
              setShowtime((currentShowtime) => ({
                ...currentShowtime,
                hour: event.target.value,
              }))
            }
            value={showtime.hour}
          />
        </div>
        <div className="text-center">
          <Paragraph text="Minute" margin="2" size="sm" />
          <FormInput
            type="number"
            onChange={(event) =>
              setShowtime((currentShowtime) => ({
                ...currentShowtime,
                minute: event.target.value,
              }))
            }
            value={showtime.minute}
          />
        </div>
        <FormSubmit value="Submit" width="3/6" />
      </FormContainer>
    </AnimatedContainer>
  );
};

export default add;

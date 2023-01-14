import React from "react";
import { Paragraph } from "./shared/Texts";

const ShowtimeListCard = ({ showtime }) => {
  return (
    <div className="w-4/6 h-10 p-3 shadow-md bg-slate-100 rounded-md text-center">
      <Paragraph text={showtime} size="xs" style="medium" margin="auto" />
    </div>
  );
};

export default ShowtimeListCard;

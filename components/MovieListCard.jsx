import React from "react";
import { Paragraph } from "@/components/shared/Texts";
import { parseBytes32String } from "ethers/lib/utils.js";

const MovieListCard = ({ movieTitle, clickable, onClick }) => {
  return (
    <div
      onClick={clickable && onClick}
      className="w-4/6 h-10 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
    >
      <div className="w-3/6 flex justify-center items-center gap-4">
        <Paragraph
          text={parseBytes32String(movieTitle)}
          style="medium"
          size="xs"
        />
      </div>
    </div>
  );
};

export default MovieListCard;

import React from "react";
import { Paragraph } from "../../shared/Texts";

const MovieListCard = ({ movie }) => {
  return (
    <Link
      href={"/manager/region/" + region + "/" + parseInt(cinema.hex)}
      className="w-5/6 h-16 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
    >
      <div className="w-3/6 flex justify-center items-center gap-4">
        <Paragraph text={movie} style="medium" />
      </div>
      <div className="w-2/6">
        <p className="font-poppins text-xs text-center"></p>
      </div>
    </Link>
  );
};

export default MovieListCard;

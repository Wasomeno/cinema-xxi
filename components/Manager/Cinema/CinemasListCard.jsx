import Link from "next/link";
import React from "react";

const CinemaListCardLoading = () => {
  return (
    <div className="w-5/6 h-16 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2 animate-pulse" />
  );
};

const CinemasListCard = ({ cinema, region }) => {
  return (
    <Link
      href={"/manager/cinema/" + region + "/" + parseInt(cinema.hex)}
      className="w-5/6 h-16 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
    >
      <div className="w-3/6 flex justify-center items-center gap-4">
        <h3 className="font-poppins text-sm font-medium">
          Cinema {parseInt(cinema.hex)}
        </h3>
      </div>
      <div className="w-2/6">
        <p className="font-poppins text-xs text-center"></p>
      </div>
    </Link>
  );
};

export default CinemasListCard;

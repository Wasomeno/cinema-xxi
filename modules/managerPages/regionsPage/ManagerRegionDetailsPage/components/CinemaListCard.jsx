import Link from "next/link";
import React from "react";

const CinemaListCard = ({ cinema, region }) => {
  return (
    <Link
      href={"/manager/region/" + region + "/" + cinema.id}
      className="flex h-16 w-5/6 items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
    >
      <div className="flex w-3/6 items-center justify-center gap-4">
        <h3 className="font-poppins text-sm font-medium">{cinema.name}</h3>
      </div>
      <div className="w-2/6">
        <p className="font-poppins text-center text-xs"></p>
      </div>
    </Link>
  );
};

export default CinemaListCard;

import Link from "next/link";
import React from "react";

const CinemaListCard = ({ cinema, region }) => {
  return (
    <Link
      href={"/manager/region/" + region + "/" + cinema.id}
      className="flex h-16 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
    >
      <h3 className="font-poppins text-sm font-medium">{cinema.name}</h3>
    </Link>
  );
};

export default CinemaListCard;

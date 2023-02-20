import Link from "next/link";
import React from "react";

import { Globe } from "@/components/Icons/Globe";

const RegionListCardLoading = () => {
  return (
    <div className="flex h-16 w-5/6 animate-pulse items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md" />
  );
};

const RegionListCard = ({ regionId, regionName, regionCinemaAmount }) => {
  return (
    <Link
      href={"/manager/region/" + regionId}
      className="flex h-16 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
    >
      <div className="w-2/12 text-center lg:w-1/12">
        <p className="font-poppins text-xs font-medium lg:text-sm">
          {regionId}
        </p>
      </div>
      <div className="w-4/12 text-center lg:w-3/12">
        <p className="font-poppins text-xs font-medium lg:text-sm">
          {regionName}
        </p>
      </div>
      <div className="w-2/12 text-center lg:w-2/12">
        <p className="font-poppins text-center text-xs lg:text-sm">
          {regionCinemaAmount}
        </p>
      </div>
    </Link>
  );
};

export default RegionListCard;

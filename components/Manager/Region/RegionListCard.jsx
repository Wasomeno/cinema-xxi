import { ethers } from "ethers";
import Link from "next/link";
import React from "react";
import Globe from "../../Icons/Globe";
import { useRegionDetails } from "../../reactQuery/queries/Region/useRegionDetails";

const RegionListCardLoading = () => {
  return (
    <div className="w-5/6 h-16 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2 animate-pulse" />
  );
};

const RegionListCard = ({ region }) => {
  const regionDetails = useRegionDetails({ region: region });

  const bytesToString = (bytes) => {
    return ethers.utils.parseBytes32String(bytes);
  };

  return regionDetails.isLoading ? (
    <RegionListCardLoading />
  ) : (
    <Link
      href={"/manager/region/" + region}
      className="w-5/6 h-16 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
    >
      <div className="w-3/6 flex justify-center items-center gap-4">
        <Globe />
        <h3 className="font-poppins text-sm font-medium">
          {bytesToString(regionDetails.data?._name)}
        </h3>
      </div>
      <div className="w-2/6">
        <p className="font-poppins text-xs text-center">
          {(regionDetails.data?._cinemasAmount).toString()}
        </p>
      </div>
    </Link>
  );
};

export default RegionListCard;

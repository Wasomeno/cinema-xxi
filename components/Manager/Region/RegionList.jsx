import React from "react";
import { MoonLoader } from "react-spinners";
import { useAllRegions } from "../../reactQuery/queries/Region/useAllRegions";
import RegionListCard from "./RegionListCard";

const RegionList = () => {
  const allRegions = useAllRegions();
  return (
    <div className="flex flex-col justify-start items-center gap-3 mt-3 h-5/6">
      {allRegions.isLoading ? (
        <MoonLoader loading={allRegions.isLoading} size="30" color="black" />
      ) : (
        <>
          {allRegions.data.length < 1 ? (
            <p className="font-poppins font-medium text-xs">
              No active regions
            </p>
          ) : (
            allRegions.data.map((region) => (
              <RegionListCard region={region} key={region} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default RegionList;

import Link from "next/link";
import React from "react";

const RegionManagerMenu = () => {
  return (
    <div className="flex justify-end items-center h-16">
      <div>
        <Link
          href={"/manager/region/add"}
          className="p-2 px-3 bg-lime-500 text-xs font-medium font-poppins rounded-md"
        >
          Add New Region
        </Link>
      </div>
    </div>
  );
};

export default RegionManagerMenu;

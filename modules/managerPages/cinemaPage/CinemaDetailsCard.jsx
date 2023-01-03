import { useRouter } from "next/router";
import React from "react";
import ChevronRight from "@/components/Icons/ChevronRight";

const CinemaDetailsCard = ({ title, value, withLink, link }) => {
  const { push } = useRouter();
  return (
    <div
      className="col-span-1 h-24 bg-slate-200 rounded-lg shadow p-2"
      onClick={() => withLink && push(link)}
    >
      <div className="flex flex-row-reverse h-full justify-evenly items-center">
        {withLink && (
          <div>
            <ChevronRight size="4" color="gray" />
          </div>
        )}
        <div className="w-3/6 text-center">
          <p className="text-sm font-medium font-poppins">{title}</p>
        </div>
        <div className="text-center">
          <p className=" text-slate-500 font-semibold font-poppins">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default CinemaDetailsCard;

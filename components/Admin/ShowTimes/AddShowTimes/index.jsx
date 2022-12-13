import React from "react";
import useUnary from "../../../../hooks/useUnary";
import { addCinemaShowTime } from "../../../reactQuery/mutations/Cinema/addCinemaShowTime";
import HourControl from "./HourControl";
import MinutesControl from "./MinutesControl";

const AddShowTimes = ({ adminDetails }) => {
  const hourUnary = useUnary(1, 10, 1, 1);
  const minutesUnary = useUnary(5, 55, 5, 5);
  const addShowTimes = addCinemaShowTime({
    adminDetails: adminDetails,
    hour: hourUnary.number,
    minutes: minutesUnary.number,
  });

  return (
    <div className="flex flex-col items-center bg-slate-200 shadow-lg rounded-lg w-5/6 gap-4 h-72">
      <h1 className="font-poppins m-2 font-medium text-center">
        Add Show Times
      </h1>
      <div className="flex justify-center h-3/6 gap-4 items-center">
        <HourControl hourUnary={hourUnary} />
        <MinutesControl minutesUnary={minutesUnary} />
      </div>
      <button
        className="p-2 m-2 bg-black text-white font-poppins font-medium text-sm rounded-md w-3/6"
        onClick={() => addShowTimes()}
      >
        Submit
      </button>
    </div>
  );
};

export default AddShowTimes;

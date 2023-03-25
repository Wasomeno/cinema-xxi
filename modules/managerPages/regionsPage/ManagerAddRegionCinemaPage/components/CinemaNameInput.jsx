import React from "react";

const CinemaNameInput = ({ cinemaName, setCinemaName }) => {
  return (
    <div className="flex w-7/12 flex-col items-start justify-center gap-1">
      <label id="cinemaName" className="font-poppins text-xs lg:text-sm">
        Cinema Name
      </label>
      <input
        id="cinemaName"
        value={cinemaName}
        onChange={(event) => setCinemaName(event.target.value)}
        type="text"
        className="h-8 w-full rounded-lg border border-slate-400 p-2 font-openSans text-xs md:text-sm"
      />
    </div>
  );
};

export default CinemaNameInput;

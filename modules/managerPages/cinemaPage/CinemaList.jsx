import React from "react";
import CinemasListCard from "./CinemasListCard";

const CinemaList = ({ cinemas, region }) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      {cinemas.length < 1 ? (
        <p className="font-poppins text-sm">No active cinemas</p>
      ) : (
        cinemas.map((cinema) => (
          <CinemasListCard cinema={cinema} region={region} />
        ))
      )}
    </div>
  );
};

export default CinemaList;

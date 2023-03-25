import React from "react";

const StudioCapacitiesInput = ({ studioCapacities, setStudioCapacities }) => {
  return (
    <div className="my-3 flex w-full flex-col items-start gap-2 lg:w-4/6">
      <label id="studioCapacities" className="font-poppins text-xs md:text-sm">
        Studio Capacities
      </label>
      <div className="grid grid-cols-2 items-center gap-2 lg:grid-cols-4">
        {studioCapacities.map((studio, index) => (
          <input
            key={index}
            id="studioCapacities"
            type="number"
            className="col-span-1 h-8 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs md:text-sm"
            placeholder={"Studio " + parseInt(index + 1)}
            value={studio}
            onChange={(e) =>
              setStudioCapacities((current) =>
                current.map((cap, inputIndex) => {
                  if (inputIndex === index) {
                    return e.target.value;
                  } else {
                    return cap;
                  }
                })
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default StudioCapacitiesInput;

import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import AnimatedContainer from "../../../../../components/AnimatedContainer";
import ChevronLeft from "../../../../../components/Icons/ChevronLeft";
import ChevronRight from "../../../../../components/Icons/ChevronRight";
import ManagerDashboardHeader from "../../../../../components/Manager/ManagerDashboardHeader";
import { addCinema } from "../../../../../components/reactQuery/mutations/Cinema/addCinema";
import { Paragraph } from "../../../../../components/shared/Texts";

const AddCinemaInRegion = () => {
  const { query } = useRouter();
  const region = query.regionId;
  const [cinemaId, setCinemaId] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [studioAmount, setStudioAmount] = useState(2);
  const [studioCapacities, setStudioCapacities] = useState(["", ""]);

  const addCinemaMutation = addCinema({
    regionId: region,
    cinemaId: cinemaId,
    cinemaName: cinemaName,
    studioAmount: studioAmount,
    studioCapacities: studioCapacities,
  });

  const decrementStudioAmount = () => {
    if (studioAmount <= 2) return;
    setStudioAmount((currentAmount) => currentAmount - 1);
    setStudioCapacities((currentAmount) =>
      currentAmount.filter((studio, index) => {
        return index !== studioAmount - 1;
      })
    );
  };

  const incrementStudioAmount = () => {
    if (studioAmount >= 10) return;
    setStudioAmount((currentAmount) => currentAmount + 1);
    setStudioCapacities((currentAmount) => [...currentAmount, ""]);
  };

  return (
    <AnimatedContainer className="flex flex-col justify-center items-center w-full p-4">
      <ManagerDashboardHeader title="Add new cinema" withBackButton />
      <form
        onSubmit={(event) => addCinemaMutation(event)}
        className="w-4/6 flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col justify-center items-center m-2">
          <Paragraph text={"Region " + region} size="sm" />
        </div>

        <div className="w-full flex flex-col justify-center items-center m-2">
          <Paragraph text="Cinema Id" size="sm" style="medium" />
          <input
            value={cinemaId}
            onChange={(event) => setCinemaId(event.target.value)}
            type="number"
            className="w-8/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center text-sm"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center m-2">
          <Paragraph text="Cinema Name" size="sm" style="medium" />
          <input
            value={cinemaName}
            onChange={(event) => setCinemaName(event.target.value)}
            type="text"
            className="w-8/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center text-sm"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2">
          <Paragraph text="Studio Amount" size="sm" style="medium" />
          <div className="flex w-full justify-center items-center">
            <button
              type="button"
              className="p-2 bg-black rounded-lg"
              onClick={decrementStudioAmount}
            >
              <ChevronLeft size="4" color="white" />
            </button>
            <input
              type="number"
              value={studioAmount}
              readOnly={true}
              className="w-4/12 h-8 mx-2 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-sm text-center"
            />
            <button
              type="button"
              className="p-2 bg-black rounded-lg"
              onClick={incrementStudioAmount}
            >
              <ChevronRight size="4" color="white" />
            </button>
          </div>
        </div>
        <div className="m-2 h-2/6 w-full">
          <Paragraph text="Studios Capacity" size="sm" style="medium" />
          <div className="w-full h-full grid grid-cols-2 gap-2">
            {studioCapacities.map((studio, index) => (
              <input
                key={index}
                type="number"
                className="col-span-1 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2 text-center text-sm"
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

        <div className="w-full flex flex-col justify-center items-center m-4">
          <input
            type="submit"
            value="Submit"
            className="w-10/12 bg-slate-900 text-white font-poppins font-medium p-2 text-center rounded-lg text-sm"
          />
        </div>
      </form>
    </AnimatedContainer>
  );
};

export default AddCinemaInRegion;

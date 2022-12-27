import React, { useRef, useState } from "react";
import AnimatedContainer from "../../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../../components/Manager/ManagerDashboardHeader";
import { addCinema } from "../../../../components/reactQuery/mutations/Cinema/addCinema";
import { useLoading, useToast } from "../../../../store/stores";

const AddCinema = () => {
  const [region, setRegion] = useState("");
  const [cinemaId, setCinemaId] = useState("");
  const [studioAmount, setStudioAmount] = useState(2);
  const [studioCapacities, setStudioCapacities] = useState(["", ""]);
  const cinemaNameRef = useRef();

  const addCinemaMutation = addCinema({
    cinemaDetails: {
      cinemaId: parseInt(cinemaId),
      region: parseInt(region),
      name: cinemaNameRef.current?.value,
      studioAmount: studioAmount,
      studioCapacities: studioCapacities,
    },
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
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader title="Add New Cinema" />

      <form
        onSubmit={(event) => addCinemaMutation(event)}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col justify-center items-center m-2">
          <p className="font-poppins font-medium text-sm m-2">Region</p>
          <input
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            type="number"
            className="w-3/6 h-8 border-2 border-solid border-slate-400 rounded-md font-poppins p-2 text-center text-sm"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center m-2">
          <p className="font-poppins font-medium text-sm m-2">Cinema Id</p>
          <input
            value={cinemaId}
            onChange={(event) => setCinemaId(event.target.value)}
            type="number"
            className="w-3/6 h-8 border-2 border-solid border-slate-400 rounded-md font-poppins p-2 text-center text-sm"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center m-2">
          <p className="font-poppins font-medium text-sm m-2">Cinema Name</p>
          <input
            ref={cinemaNameRef}
            type="text"
            className="w-3/6 h-8 border-2 border-solid border-slate-400 rounded-md font-poppins p-2 text-center text-sm"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center m-2">
          <p className="font-poppins font-medium text-sm m-2">Studio Amount</p>
          <div className="flex w-full justify-center items-center">
            <button
              type="button"
              className="p-2 bg-black rounded-lg"
              onClick={decrementStudioAmount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <input
              type="number"
              value={studioAmount}
              readOnly={true}
              className="w
              -4/12 h-8 mx-2 border-2 border-solid border-slate-400 rounded-md font-poppins p-2 text-center text-sm"
            />
            <button
              type="button"
              className="p-2 bg-black rounded-lg"
              onClick={incrementStudioAmount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="m-2 h-2/6 w-full">
          <p className="text-center font-poppins font-medium text-sm m-2">
            Studios Capacity
          </p>
          <div className="w-full h-full grid grid-cols-2 gap-2">
            {studioCapacities.map((studio, index) => (
              <input
                key={index}
                type={"number"}
                className="col-span-1 h-8 border-2 border-solid border-slate-400 rounded-md font-poppins p-2 text-center text-sm"
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
            className="w-3/6 h-10 bg-slate-900 text-white font-poppins font-medium p-2 text-center rounded-md text-sm"
          />
        </div>
      </form>
    </AnimatedContainer>
  );
};

export default AddCinema;

import { useRouter } from "next/router";
import React, { useState } from "react";

const index = () => {
  const router = useRouter();
  const [showDrop, setShowDrop] = useState(false);
  const [region, setRegion] = useState("Region");
  const [regions, setRegions] = useState(["Region 1", "Region 2", "Region 3"]);
  const [movies, setMovies] = useState([
    "Movies 1",
    "Movies 2",
    "Movies 3",
    "Movies 4",
    "Movies 5",
    "Movies 6",
    "Movies 7",
    "Movies 8",
  ]);
  const toggleDropDown = () => {
    setShowDrop((current) => !current);
  };

  const selectRegion = (region) => {
    setRegion(region);
    toggleDropDown();
  };

  return (
    <div className="p-2 w-full h-full rounded-xl overflow-hidden flex flex-col items-center">
      <div className="flex items-center justify-center">
        <h1 className="font-poppins text-3xl p-2 m-4">Movies On Show</h1>
      </div>
      <div className="flex flex-col items-start justify-start self-start">
        <button
          className="w-60 p-2 flex justify-between items-center bg-slate-200 rounded-xl"
          data-dropdown-toggle="dropdown"
          onClick={toggleDropDown}
        >
          <h5 className="font-poppins font-medium m-2">{region}</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={
              !showDrop
                ? "w-6 h-6 transition ease-in-out duration-300"
                : "w-6 h-6 transition ease-in-out duration-300 rotate-90"
            }
          >
            <path
              fill-rule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          hidden={!showDrop ? true : false}
          className="transition duration-300 bg-slate-200 rounded-b-xl shadow-md my-2 p-2 w-60 absolute top-32"
        >
          <ul className="font-poppins font-medium">
            {regions.map((region) => (
              <li
                className="p-3 cursor-pointer transition duration-300 rounded-xl hover:bg-slate-300"
                onClick={() => selectRegion(region)}
              >
                {region}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-start my-3 p-3 max-w-full overflow-x-scroll">
        {movies.map((movie, index) => (
          <div key={index} className="m-2">
            <div
              onClick={() => router.push("/app/movie/" + index)}
              className="w-60 h-80 rounded-xl bg-slate-600 transition ease-in-out duration-300 cursor-pointer hover:scale-105"
            >
              {index + 1}
            </div>
            <div>
              <h5 className="font-poppins m-3 text-center text-xl font-normal">
                {movie}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;

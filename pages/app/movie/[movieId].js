import React, { useState } from "react";

const Movie = () => {
  const [movieDetails, setMovieDetails] = useState({
    title: "Movie 1",
    casts: ["Tony Gray", "Alexa Moore", "Gavin Brum", "Sarah Lomk"],
  });

  const [cinemas, setCinemas] = useState([
    "Cinema 1",
    "Cinema 2",
    "Cinema 3",
    "Cinema 4",
  ]);

  return (
    <div className="p-2 w-full h-full rounded-xl overflow-hidden flex flex-col items-center overflow-y-scroll">
      <div className="flex justify-center m-4">
        <h1 className="font-poppins text-4xl font-semibold p-2">Movie Title</h1>
      </div>
      <div className="flex justify-around items-start h-3/6 w-6/6">
        <div className="h-5/6 w-2/6">
          <div className="h-full w-full bg-slate-400 rounded-xl"></div>
        </div>
        <div className="h-5/6 w-3/6">
          <div className="m-2 mb-4">
            <div className="flex justify-start m-2">
              <h2 className="font-poppins font-medium text-xl">
                Movie Details
              </h2>
            </div>
            <div className="flex justify-start m-2">
              <p className="font-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="m-2 mb-4">
            <div className="flex justify-start m-2">
              <h2 className="font-poppins font-medium text-xl">Casts</h2>
            </div>
            <div className="flex justify-center m-4">
              {movieDetails.casts.map((cast, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-600 rounded-xl"></div>
                  <h5 className="m-2 font-poppins text-center">{cast}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="m-4 w-10/12">
        <h3 className="font-poppins text-lg font-medium text-center">
          Available Cinemas
        </h3>
        <div className="flex flex-col items-center justify-start w-full">
          {cinemas.map((cinema, index) => (
            <div key={index} className="w-10/12 bg-slate-300 p-2 m-2">
              <h5 className="font-poppins font-medium">{cinema}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;

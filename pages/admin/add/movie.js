import React, { useState } from "react";

const addMovies = () => {
  const [availablesMovies, setAvailableMovies] = useState([
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
  ]);

  const [selectedMovies, setSelectedMovies] = useState([]);

  const selectMovie = (index) => {
    const movie = availablesMovies[index];
    setSelectedMovies((currentSelected) => [...currentSelected, movie]);
  };

  const deselectMovie = (selectedIndex) => {
    setSelectedMovies((currentSelected) =>
      currentSelected.filter((movie, index) => {
        return index !== selectedIndex;
      })
    );
  };

  return (
    <div className="w-screen h-full p-4">
      <div className="text-center m-2">
        <h1 className="font-poppins text-2xl font-semibold">Add Movies</h1>
      </div>
      <div className="flex justify-around h-full">
        <div className="w-2/6 h-5/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
          <h2 className="font-poppins font-medium text-lg text-center m-2">
            Movies Available
          </h2>
          <div className="">
            <ul>
              {availablesMovies.map((movie, index) => (
                <li
                  key={index}
                  onClick={() => selectMovie(index)}
                  className="font-poppins font-normal text-base m-2 p-2 bg-slate-300 rounded-lg"
                >
                  {index + 1 + ". " + movie + " " + parseInt(index + 1)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-3/12 h-5/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg p-2">
          <h2 className="font-poppins font-medium text-lg text-center m-2">
            Selected Movies
          </h2>
          {selectedMovies.length === 0 ? (
            <div className="flex h-5/6 items-center justify-center">
              <h3 className="font-poppins">No Movies Selected</h3>
            </div>
          ) : (
            <div className="">
              <ul>
                {selectedMovies.map((movie, index) => (
                  <li
                    key={index}
                    onClick={() => deselectMovie(index)}
                    className="font-poppins font-normal text-base m-2 p-2 bg-slate-300 rounded-lg"
                  >
                    {index + 1 + ". " + movie + " " + parseInt(index + 1)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-2/6 h-5/6 bg-slate-100 shadow-slate-300 shadow-lg rounded-lg">
          <h2 className="font-poppins font-medium text-lg text-center m-2">
            Current Movies
          </h2>
          <div className="">
            <ul>
              {availablesMovies.map((movie, index) => (
                <li
                  key={index}
                  className="font-poppins font-normal text-base m-2 p-2 bg-slate-300 rounded-lg"
                >
                  {index + 1 + ". " + movie + " " + parseInt(index + 1)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addMovies;

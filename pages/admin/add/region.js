import React from "react";

const region = () => {
  const submit = () => {};
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-4/6">
        <h1 className="font-poppins text-2xl font-semibold m-2 text-center">
          Add Region
        </h1>
      </div>
      <form
        onSubmit={() => submit()}
        className="w-4/6 flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">Region ID</h5>
          <input
            type="text"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h5 className="font-poppins font-medium text-lg m-2">Region Name</h5>
          <input
            type="text"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center m-2 mb-4">
          <h5 className="font-poppins font-medium text-lg m-2">
            Cinemas Amount
          </h5>
          <input
            type="text"
            className="w-3/12 h-8 border-2 border-solid border-slate-400 rounded-lg font-poppins p-2"
          />
        </div>
        <div className="w-full text-center">
          <input
            type="submit"
            value={"Add Region"}
            className="w-3/12 rounded-lg font-poppins font-medium bg-black text-white p-2"
          />
        </div>
      </form>
    </div>
  );
};

export default region;

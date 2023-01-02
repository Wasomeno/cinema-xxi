import React from "react";

const NotValidAdmin = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-poppins text-xl font-medium m-2 my-4">
        You are not an Admin
      </p>
      <button
        className="bg-slate-100 p-2 font-poppins font-medium text-lg w-1/6 rounded-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
        onClick={() => router.push("/app")}
      >
        Back to App
      </button>
    </div>
  );
};

export default NotValidAdmin;

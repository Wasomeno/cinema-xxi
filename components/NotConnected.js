import React, { useContext } from "react";
import { appContext } from "../context/AppContext";

const NotConnected = () => {
  const context = useContext(appContext);

  const connect = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      context.setAccount(account);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-poppins font-semibold text-3xl m-2">
          Connect Your Wallet
        </h1>
        <p className="font-sans text-xl ">You need to connect your wallet</p>
      </div>
      <div className="w-3/6 m-3 text-center">
        <button
          className="bg-slate-100 p-2 font-poppins font-medium text-lg w-2/6 rounded-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
          onClick={connect}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default NotConnected;

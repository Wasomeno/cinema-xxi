import React from "react";
import { useConnect } from "wagmi";

const NotConnected = () => {
  const { connect, connectors } = useConnect();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-poppins font-semibold text-xl m-2">
          Connect Your Wallet
        </h1>
        <p className="font-sans text-base">You need to connect your wallet</p>
      </div>
      <div className="w-3/6 m-3 text-center">
        {connectors.map((connector, index) => (
          <button
            key={index}
            className="bg-slate-100 p-2 font-poppins font-medium text-sm w-4/6 rounded-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
            onClick={connect({ connector: connector })}
          >
            Connect
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotConnected;

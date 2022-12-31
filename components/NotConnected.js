import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useUserDetails } from "../hooks/useUserDetails";
import { useAccount, useConnect } from "wagmi";

const NotConnected = () => {
  const { connect, connectors } = useConnect();
  const { isConnecting } = useUserDetails();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-poppins font-semibold text-xl m-2">
          Connect Your Wallet
        </h1>
        <p className="font-sans text-base">You need to connect your wallet</p>
      </div>
      <div className="w-2/6 m-3 text-center">
        {connectors.map((connector, index) => (
          <button
            key={index}
            className="flex justify-center items-center bg-slate-100 p-2 font-poppins font-medium text-sm w-full rounded-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
            onClick={() => connect({ connector: connector })}
          >
            {isConnecting ? (
              <MoonLoader size="15" color="white" loading={isConnecting} />
            ) : (
              "Connect"
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotConnected;

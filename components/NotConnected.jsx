import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useAccount, useConnect } from "wagmi";

import { useUserDetails } from "../hooks/useUserDetails";

const NotConnected = () => {
  const { connect, connectors } = useConnect();
  const { isConnecting } = useUserDetails();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="font-poppins m-2 text-xl font-semibold">
          Connect Your Wallet
        </h1>
        <p className="font-sans text-base">You need to connect your wallet</p>
      </div>
      <div className="m-3 w-2/6 text-center">
        {connectors.map((connector, index) => (
          <button
            key={index}
            className="font-poppins flex w-full items-center justify-center rounded-xl bg-slate-100 p-2 text-sm font-medium shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
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

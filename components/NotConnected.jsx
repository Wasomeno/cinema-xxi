import MoonLoader from "react-spinners/MoonLoader";
import { useConnect } from "wagmi";

import { useUserConnectionDetails } from "../hooks/useUserConnectionDetails";

const NotConnected = () => {
  const { connect, connectors } = useConnect();
  const { isConnecting } = useUserConnectionDetails();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="m-2 font-poppins text-xl font-semibold">
          Connect Your Wallet
        </h1>
        <p className="font-sans text-base">You need to connect your wallet</p>
      </div>
      <div className="m-3 w-2/6 text-center">
        {connectors.map((connector, index) => (
          <button
            key={index}
            className="flex w-full items-center justify-center rounded-xl bg-slate-100 p-2 font-poppins text-sm font-medium shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white"
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

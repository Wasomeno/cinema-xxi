import { VscDebugDisconnect } from "react-icons/vsc";

export const WalletNotConnected = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-white">
      <span className="font-poppins lg:text-base text-sm text-slate-400">
        Connect your wallet first
      </span>
      <VscDebugDisconnect size="25" className="text-slate-400" />
    </div>
  );
};

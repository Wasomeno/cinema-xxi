import { VscDebugDisconnect } from "react-icons/vsc";

export const WalletNotConnected = () => {
  return (
    <div className="flex h-[800px] flex-col items-center justify-center  gap-2 bg-transparent">
      <span className="font-poppins text-slate-400">
        Connect your wallet first
      </span>
      <VscDebugDisconnect size="25" className="text-slate-400" />
    </div>
  );
};

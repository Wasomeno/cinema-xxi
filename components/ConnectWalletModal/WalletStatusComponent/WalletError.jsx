import XMark from "@/components/Icons/XMark";

export const WalletError = ({ error, toggleWalletModal }) => {
  setTimeout(() => toggleWalletModal(), 1500);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="p-2">
        <p className="font-poppins text-sm text-white">
          Error Connecting your Wallet
        </p>
      </div>
      <div role="status">
        <XMark size="16" color="darkRed" />
      </div>
      <div className="text-center">
        <p className="font-poppins text-sm text-white">{error.message}</p>
      </div>
    </div>
  );
};

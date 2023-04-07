import { useEffect } from "react";

import CheckMark from "@/components/Icons/Checkmark";

export const WalletSuccess = ({ toggleWalletModal }) => {
  useEffect(() => {
    const walletTimeout = setTimeout(() => toggleWalletModal(), 1500);
    return () => {
      clearTimeout(walletTimeout);
    };
  }, [toggleWalletModal]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="p-2">
        <p className="font-poppins text-sm text-white">Wallet Connected</p>
      </div>
      <div>
        <CheckMark size="16" color="fill-green-700" />
      </div>
    </div>
  );
};

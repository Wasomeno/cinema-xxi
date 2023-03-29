import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ConnectWalletModal } from "@/components/ConnectWalletModal";

export const AdminLoginPage = () => {
  const [showWalletModal, toggleShowWalletModal] = useToggle(false);
  return (
    <AnimatedContainer className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 bg-opacity-95 dark:bg-slate-800">
      <div className="">
        <h1 className="font-poppins text-base font-medium lg:text-lg">
          Admin Login Page
        </h1>
      </div>
      <div className="text-center">
        <button
          onClick={toggleShowWalletModal}
          className="rounded-md bg-slate-800 p-3 px-4 font-poppins text-sm font-medium text-white dark:bg-slate-700 "
        >
          Connect Your Wallet
        </button>
      </div>
      <AnimatePresence>
        {showWalletModal && (
          <ConnectWalletModal toggleWalletModal={toggleShowWalletModal} />
        )}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

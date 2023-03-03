import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ConnectWalletModal } from "@/components/ConnectWalletModal";

export const ManagerLoginPage = () => {
  const [showWalletModal, toggleShowWalletModal] = useToggle(false);
  return (
    <AnimatedContainer className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="">
        <h1 className="font-poppins text-base font-medium lg:text-lg">
          Manager Login Page
        </h1>
      </div>
      <div className="text-center">
        <button
          onClick={toggleShowWalletModal}
          className="font-poppins rounded-md bg-slate-900 p-3 px-4 text-sm font-medium text-white "
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

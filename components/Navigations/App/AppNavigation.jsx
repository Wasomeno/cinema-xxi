import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import dynamic from "next/dynamic";
import Link from "next/link";

import { ConnectWalletModal } from "./ConnectWalletModal";

const UserMenuModal = dynamic(() => import("../../UserMenuModal"));

const AppNavigation = () => {
  const { isConnected, user } = useUserConnectionDetails();
  const [showWalletModal, toggleShowWalletModal] = useToggle(false);
  const [showUserModal, toggleShowUserModal] = useToggle(false);

  return (
    <>
      <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-between border-b bg-slate-50 p-2 dark:bg-slate-900 lg:h-16">
        <div className="w-2/12 p-2 text-center">
          <span className="font-inter border-2 border-slate-900 bg-slate-50 px-2 text-xs tracking-widest text-slate-900 sm:text-base md:text-base">
            XXI
          </span>
        </div>
        <div className="hidden w-4/12 justify-evenly gap-5 md:flex">
          <Link
            href="/app"
            className="w-1/6 p-2 text-center font-poppins text-xs tracking-wider md:text-sm"
          >
            Home
          </Link>
          <Link
            href="/app/cinemas"
            className="w-1/6 p-2 text-center font-poppins text-xs tracking-wider md:text-sm"
          >
            Cinemas
          </Link>
          <Link
            href="/app/transactions"
            className="w-1/6 p-2 text-center font-poppins text-xs tracking-wider md:text-sm"
          >
            Transactions
          </Link>
        </div>
        <div className="w-auto text-center lg:w-2/12">
          {isConnected ? (
            <button
              onClick={() => toggleShowUserModal()}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-transparent p-1 transition duration-300 ease-in-out"
            >
              <span className="h-8 w-8 rounded-full border-2 border-slate-300 bg-blue-400 md:h-8 md:w-8" />
              <p className="hidden font-poppins text-xs sm:hidden sm:text-sm md:block">
                {user.slice(0, 6)}...
                {user.slice(-6, -1) + user.slice(-1)}
              </p>
            </button>
          ) : (
            <button
              onClick={() => toggleShowWalletModal()}
              className="rounded-lg bg-slate-900 p-2 px-4 font-poppins text-xs lg:text-sm tracking-wider text-white dark:bg-slate-700"
            >
              Connect
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showWalletModal && (
          <ConnectWalletModal toggleWalletModal={toggleShowWalletModal} />
        )}
        {showUserModal && (
          <UserMenuModal toggleShowUserModal={toggleShowUserModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default AppNavigation;

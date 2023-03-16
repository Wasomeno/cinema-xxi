import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useUserDetails } from "hooks/useUserDetails";
import dynamic from "next/dynamic";
import Link from "next/link";

import { ConnectWalletModal } from "@/components/ConnectWalletModal";

const AppNavigation = () => {
  const { isConnected, user } = useUserDetails();
  const [showWalletModal, toggleShowWalletModal] = useToggle(false);
  const [showUserModal, toggleShowUserModal] = useToggle(false);

  const UserMenuModal = dynamic(() => import("../../UserMenuModal"));

  return (
    <>
      <div className="sticky top-0 left-0 z-10 flex h-16 w-full items-center justify-between bg-slate-50 p-2">
        <div className="w-2/12 p-2 text-center">
          <span className="font-inter border-2 border-slate-900 bg-slate-50 px-2 text-sm tracking-widest text-slate-900 sm:text-base md:text-lg">
            XXI
          </span>
        </div>
        <div className="hidden w-4/12 justify-evenly gap-5 md:flex">
          <Link
            href="/app"
            className="font-inter w-1/6 p-2 text-center text-xs tracking-wider md:text-sm"
          >
            Home
          </Link>
          <Link
            href="/app/cinemas"
            className="font-inter w-1/6 p-2 text-center text-xs tracking-wider md:text-sm"
          >
            Cinemas
          </Link>
        </div>
        <div className="w-3/12 text-center lg:w-2/12">
          {isConnected ? (
            <button
              onClick={() => toggleShowUserModal()}
              className="flex w-full items-center justify-center gap-4 rounded-full border border-transparent p-1 transition duration-300 ease-in-out hover:border-blue-900"
            >
              <span className="h-8 w-8 rounded-full border-2 bg-blue-400" />
              <p className="hidden font-poppins text-sm  sm:hidden md:block">
                {user.slice(0, 6)}...
                {user.slice(-6, -1) + user.slice(-1)}
              </p>
            </button>
          ) : (
            <button
              onClick={() => toggleShowWalletModal()}
              className="rounded-lg bg-slate-900 p-2 px-4 font-poppins text-xs tracking-wider text-white md:text-sm"
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

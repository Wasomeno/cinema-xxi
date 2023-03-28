import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { AdminSubHeader } from "@/components/Headers/AdminSubHeader";

import StudioDetailsMenu from "./StudioDetailsMenu";

export const AdminStudioDetailsPage = () => {
  const { query } = useRouter();
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen bg-opacity-95 p-4 dark:bg-slate-800">
      <AdminHeader withBackButton>{"Studio " + query.studio}</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <AdminSubHeader toggleShowMenu={toggleShowMenu}>
            Studio Details
          </AdminSubHeader>
        </div>
      </div>
      <AnimatePresence>
        {showMenu && <StudioDetailsMenu toggleShowMenu={toggleShowMenu} />}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

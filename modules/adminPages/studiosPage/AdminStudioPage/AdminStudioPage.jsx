import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import { StudioList } from "./components/StudioList";
import { StudioListMenu } from "./components/StudioListMenu";

export const AdminStudioPage = () => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Studios</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <AdminSubHeader object="studio" toggleShowMenu={toggleShowMenu} />
          <StudioList />
        </div>
      </div>
      <AnimatePresence>
        {showMenu && <StudioListMenu toggleShowMenu={toggleShowMenu} />}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/Headers/ManagerSubHeader";
import { useRegionDetails } from "@/components/reactQuery/queries/Region/useRegionDetails";

import CinemaList from "./components/CinemaList";

const ManagerRegionDetailsMenu = dynamic(() =>
  import("./components/ManagerRegionDetailsMenu").then(
    (component) => component.ManagerRegionDetailsMenu
  )
);

export const ManagerRegionDetailsPage = ({ regionDetails }) => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  const [deleteMode, toggleDeleteMode] = useToggle(false);

  // if (regionDetails.isLoading)
  //   return (
  //     <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
  //       <p className="font-poppins text-xs">Fetching region details</p>
  //       <MoonLoader
  //         loading={regionDetails.isLoading}
  //         size="30"
  //         color="black"
  //         speedMultiplier={0.75}
  //       />
  //     </div>
  //   );

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll bg-opacity-95 p-4 dark:bg-slate-800">
      <ManagerHeader withBackButton>{regionDetails.name}</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full md:w-5/6 lg:w-4/6">
          <ManagerSubHeader toggleShowMenu={toggleShowMenu}>
            Region Details
          </ManagerSubHeader>
          <div className="p-2">
            <div className="h-48 rounded-lg bg-slate-400" />
          </div>
          <CinemaList
            cinemas={regionDetails.cinema}
            region={regionDetails.id}
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <ManagerRegionDetailsMenu
            region={regionDetails.id}
            toggleDeleteMode={toggleDeleteMode}
            toggleShowMenu={toggleShowMenu}
          />
        )}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

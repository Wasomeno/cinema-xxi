import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import AnimatedContainer from "@/components/AnimatedContainer";

import { AppBannerSlider } from "./components/AppBannerSlider";
import RegionListModal from "./components/RegionListModal";
import { RegionMovies } from "./components/RegionMovies";

export const AppHome = ({ firstRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState(firstRegion);
  const [showRegionList, toggleShowRegionList] = useToggle(false);

  return (
    <AnimatedContainer className="z-5 relative flex h-screen scroll-p-8 flex-col gap-4 overflow-y-scroll bg-white p-4 transition-all duration-200 dark:bg-slate-800">
      <div className="flex items-center justify-center">
        <AppBannerSlider />
      </div>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <button
            onClick={toggleShowRegionList}
            className="flex w-6/12  items-center justify-between rounded-md border border-slate-300 bg-slate-50 p-2 text-start font-poppins text-xs dark:border-slate-500 dark:bg-slate-700 md:w-3/12 lg:text-sm"
          >
            <span className="text-slate-800 dark:text-slate-50">
              {selectedRegion?.name}
            </span>
            <span
              className={twMerge(
                showRegionList && "rotate-90",
                "transition duration-200"
              )}
            >
              <HiChevronRight size="16" />
            </span>
          </button>
        </div>
      </div>
      <RegionMovies selectedRegion={selectedRegion} />
      <AnimatePresence>
        {showRegionList && (
          <RegionListModal
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            toggleShowRegionList={toggleShowRegionList}
          />
        )}
      </AnimatePresence>
    </AnimatedContainer>
  );
};

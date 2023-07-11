import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";

import AnimatedContainer from "@/components/AnimatedContainer";
import { query } from "@/components/reactQuery/queries/query";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";

import { AppBannerSlider } from "./components/AppBannerSlider";

const RegionListModal = dynamic(() => import("./components/RegionListModal"));

export const AppHome = ({ firstRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState(firstRegion);

  const [showRegionList, toggleShowRegionList] = useToggle(false);
  const moviesInRegion = query({
    queryKey: regionQueryKeys.regionMovies(selectedRegion.id),
    url: "/api/regions/" + selectedRegion.id + "/movies",
  });

  return (
    <AnimatedContainer className="z-5 relative flex h-screen scroll-p-8 flex-col gap-4 overflow-y-scroll bg-slate-50 bg-opacity-95 p-4 transition-all duration-200 dark:bg-slate-800">
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
              className={
                (showRegionList && "rotate-90" + " ") +
                "transition duration-200"
              }
            >
              <HiChevronRight size="16" />
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-full lg:w-5/6">
          <h2 className="text-sm md:text-base">Movies on Show</h2>
        </div>
        <div className="flex w-full justify-start gap-3 overflow-x-scroll lg:w-10/12">
          {moviesInRegion.isLoading
            ? ["dummy", "dummy", "dummy", "dummy", "dummy"].map(
                (dummy, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="h-48 w-36 animate-pulse rounded-lg bg-slate-300 lg:h-64 lg:w-48" />
                    <span className="h-8 w-4/6 animate-pulse rounded-lg bg-slate-300" />
                  </div>
                )
              )
            : moviesInRegion.data?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/app/${selectedRegion.id}/${movie.id}`}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative h-48 w-36 bg-slate-200 shadow-sm lg:h-64 lg:w-48">
                    <Image
                      src={movie.image_url}
                      alt="movie-image"
                      fill
                      className="rounded-lg"
                    />
                  </div>
                  <span className="q w-32 text-center font-poppins text-xs tracking-wider lg:w-40 lg:text-sm">
                    {movie.title}
                  </span>
                </Link>
              ))}
        </div>
      </div>
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

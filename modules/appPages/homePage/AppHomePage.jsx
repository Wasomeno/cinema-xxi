import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ChevronRight from "@/components/Icons/ChevronRight";
import { useRegionMovies } from "@/components/reactQuery/queries/Movie/useRegionMovies";

const RegionListModal = dynamic(() => import("./components/RegionListModal"));

export const AppHomePage = ({ firstRegion }) => {
  const [showRegionList, toggleShowRegionList] = useToggle(false);
  const [selectedRegion, setSelectedRegion] = useState(firstRegion);
  const moviesInRegion = useRegionMovies({ regionId: selectedRegion?.id });

  return (
    <>
      <AnimatedContainer className="z-5 relative flex h-screen scroll-p-8 flex-col gap-4 overflow-y-scroll bg-slate-50 bg-opacity-95 p-4 transition-all duration-200 dark:bg-slate-800">
        <div className="flex items-center justify-center lg:h-3/6">
          <div className="relative h-40 w-full rounded-lg bg-slate-400  shadow-md md:h-52 lg:h-72 lg:w-5/6"></div>
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
                <ChevronRight
                  color="stroke-slate-700 dark:stroke-slate-400"
                  size="4"
                />
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full lg:w-5/6">
            <h2 className="text-sm md:text-base">Movies on Show</h2>
          </div>
          <div className="flex w-full justify-center lg:w-10/12">
            <DataContainer
              object="movies"
              loading={moviesInRegion.isLoading}
              className="w-full"
            >
              {moviesInRegion.data?.length < 1 ? (
                <div className="flex h-96 items-center justify-center">
                  <p className="font-poppins text-xs lg:text-sm">
                    No Active Movies
                  </p>
                </div>
              ) : (
                <div className="flex h-96 max-w-full snap-x justify-start gap-4 overflow-x-scroll py-2 lg:flex-wrap">
                  {moviesInRegion.data?.map((movie) => (
                    <Link
                      href={"/app/" + 1 + "/" + movie.id}
                      key={movie.id}
                      className="snap-center transition duration-300 ease-in-out lg:hover:scale-105"
                    >
                      <div className="h-48 w-40 rounded-md bg-slate-200 shadow-md sm:h-56 md:h-72 lg:w-56" />
                      <div className="mt-4 text-center">
                        <p className="font-poppins text-xs tracking-wider lg:text-sm">
                          {movie.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </DataContainer>
          </div>
        </div>
      </AnimatedContainer>
      <AnimatePresence>
        {showRegionList && (
          <RegionListModal
            setSelectedRegion={setSelectedRegion}
            toggleShowRegionList={toggleShowRegionList}
          />
        )}
      </AnimatePresence>
    </>
  );
};

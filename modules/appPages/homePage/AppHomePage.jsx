import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ChevronRight from "@/components/Icons/ChevronRight";
import { useRegionMovies } from "@/components/reactQuery/queries/Movie/useRegionMovies";
import { Paragraph } from "@/components/shared/Texts";

export const AppHomePage = () => {
  const [showRegionList, toggleShowRegionList] = useToggle(false);
  const [selectedRegion, setSelectedRegion] = useState({
    name: "Region Test",
    id: 1,
  });

  const moviesInRegion = useRegionMovies({ regionId: selectedRegion?.id });

  const RegionListModal = dynamic(() => import("./components/RegionListModal"));

  return (
    <>
      <AnimatedContainer className="z-5 relative h-screen scroll-p-8 overflow-y-scroll">
        <div className="flex items-center justify-center p-3 lg:h-3/6">
          <div className="relative h-40 w-full rounded-lg bg-slate-400  shadow-md md:h-52 lg:h-72 lg:w-5/6"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-full px-3 lg:w-5/6">
            <button
              onClick={toggleShowRegionList}
              className="flex w-6/12  items-center justify-between rounded-md border border-slate-300 bg-slate-50 p-2 text-start font-poppins text-xs md:w-3/12 lg:text-sm"
            >
              <span>{selectedRegion?.name}</span>
              <span
                className={
                  (showRegionList && "rotate-90" + " ") +
                  "transition duration-200"
                }
              >
                <ChevronRight size="4" />
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-3">
          <div className="w-full px-2 lg:w-5/6">
            <h2 className="text-sm md:text-base">Movies on Show</h2>
          </div>
          <div className="flex w-full justify-center p-2 lg:w-5/6">
            <DataContainer
              object="movies"
              loading={moviesInRegion.isLoading}
              className="w-full"
            >
              {moviesInRegion.data?.length < 1 ? (
                <div className="flex h-52 items-center justify-center">
                  <Paragraph size="xs">No Active Movies</Paragraph>
                </div>
              ) : (
                <div className="flex max-w-full snap-x justify-start gap-4 overflow-x-scroll py-2 lg:flex-wrap">
                  {moviesInRegion.data?.map((movie) => (
                    <Link
                      href={"/app/" + 1 + "/" + movie.id}
                      key={movie.id}
                      className="snap-center transition duration-300 ease-in-out hover:scale-105"
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

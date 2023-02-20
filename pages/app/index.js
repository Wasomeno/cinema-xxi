import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAllRegions } from "../../components/reactQuery/queries/Region/useAllRegions";
import useToggle from "hooks/useToggle";
import { useRegionMovies } from "@/components/reactQuery/queries/Movie/useRegionMovies";
import Image from "next/image";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import Link from "next/link";

const index = () => {
  const router = useRouter();
  const [showDrop, toggleShowDrop] = useToggle(false);
  const [selectedRegion, setSelectedRegion] = useState({});
  const fetchedRegions = useAllRegions();
  const fetchedMovies = useRegionMovies({ region: selectedRegion.id });

  const selectRegion = (region) => {
    setSelectedRegion(region);
    toggleShowDrop();
  };

  return (
    <div className="h-full">
      <div className="flex h-2/6 justify-center p-3 lg:h-3/6">
        <div className="relative h-40 w-5/6 rounded-lg  bg-slate-400 shadow-md md:h-52 lg:h-72"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 p-3">
        <div className="w-5/6">
          <input
            className="font-poppins rounded-lg p-2 text-xs shadow-md md:text-sm"
            type="text"
            value="Region"
          />
        </div>
        <div className="w-5/6 p-2">
          <h2 className="text-sm md:text-base">Movies on Show</h2>
        </div>
        <div className="flex w-full justify-center p-2">
          <div className="w-5/6 md:w-4/6">
            <div className="grid w-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-4">
              {fetchedMovies.data.map((movie) => (
                <Link
                  href={"/app/" + 1 + "/" + movie.id}
                  key={movie.id}
                  className="col-span-2 transition duration-300 ease-in-out hover:scale-105 sm:col-span-2 md:col-span-1"
                >
                  <div className="h-48 rounded-md bg-slate-200 shadow-md sm:h-56 md:h-72" />
                  <div className="mt-4 text-center">
                    <p className="font-poppins text-sm tracking-wider">
                      {movie.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

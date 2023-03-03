import { useSelectDeselect } from "hooks/useSelectDeselect";
import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import EllipsisVertical from "@/components/Icons/EllipsisVertical";
import { useRegionDetails } from "@/components/reactQuery/queries/Region/useRegionDetails";
import { Subtitle } from "@/components/shared/Texts";

import CinemaList from "./components/CinemaList";
import { ManagerRegionDetailsMenu } from "./components/ManagerRegionDetailsMenu";

export const ManagerRegionDetailsPage = () => {
  const { query } = useRouter();
  const [showMenu, toggleShowMenu] = useToggle(false);
  const [deleteMode, toggleDeleteMode] = useToggle(false);
  const regionDetails = useRegionDetails({ region: query?.regionId });

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <ManagerHeader withBackButton>{regionDetails.data?.name}</ManagerHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <div className="my-2 flex items-center justify-between">
            <div className="w-2/6">
              <Subtitle size="xs">Region Details</Subtitle>
            </div>
            <div className="relative">
              <button
                className=" h-8 w-8 rounded-full bg-slate-100 shadow-md"
                onClick={toggleShowMenu}
              >
                <EllipsisVertical />
              </button>
              {showMenu && (
                <ManagerRegionDetailsMenu
                  region={query?.regionId}
                  toggleDeleteMode={toggleDeleteMode}
                  toggleShowMenu={toggleShowMenu}
                />
              )}
            </div>
          </div>
          <div className="p-2">
            <div className="h-48 rounded-lg bg-slate-400" />
          </div>
          <CinemaList
            cinemas={regionDetails.data?.cinema}
            region={query?.regionId}
            deleteMode={deleteMode}
            toggleDeleteMode={toggleDeleteMode}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

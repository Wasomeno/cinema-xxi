import useToggle from "hooks/useToggle";
import Link from "next/link";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import ChevronRight from "@/components/Icons/ChevronRight";
import EllipsisVertical from "@/components/Icons/EllipsisVertical";
import { useCinemaDetails } from "@/components/reactQuery/queries/Cinema/useCinemaDetails";
import { Paragraph, Subtitle } from "@/components/shared/Texts";

export const AdminStudioPage = () => {
  const [showMenu, toggleShowMenu] = useToggle();
  const cinemaDetails = useCinemaDetails({ region: 1, cinema: 1 });
  const studiosDataMock = [1, 2, 3];
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Studios</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full md:w-4/6">
          <div className="my-4 flex items-center justify-between">
            <div className="w-3/6">
              <Subtitle size="sm">List of Studios</Subtitle>
            </div>
            <div className="relative">
              <button
                className="h-8 w-8 rounded-full bg-slate-100 shadow-md"
                onClick={toggleShowMenu}
              >
                <EllipsisVertical />
              </button>
            </div>
          </div>
          <DataContainer
            className="flex flex-col items-center justify-start gap-3"
            loading={false}
            object="studios"
          >
            {studiosDataMock.map((studio, index) => (
              <Link
                key={index}
                href={"/admin/studios/" + studio}
                className="flex h-14 w-full items-center justify-center rounded-md bg-slate-200 p-2 shadow-sm"
              >
                <div className="w-2/6 text-center">
                  <Paragraph size="sm">{"Studio " + studio}</Paragraph>
                </div>
                <div className="w-1/6">
                  <ChevronRight size="5" color="grey" />
                </div>
              </Link>
            ))}
          </DataContainer>
        </div>
      </div>
    </AnimatedContainer>
  );
};

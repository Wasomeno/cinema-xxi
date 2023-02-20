import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { useCinemaDetails } from "@/components/reactQuery/queries/Cinema/useCinemaDetails";

import CinemaDetailsCard from "./components/CinemaDetailsCard";
import DeleteCinemaModal from "./components/DeleteCinemaModal";

export const ManagerCinemaDetailsPage = () => {
  const { regionId, cinemaId } = useRouter().query;
  const [showModal, toggleShowModal] = useToggle(false);
  const cinemaDetails = useCinemaDetails({
    region: regionId,
    cinema: cinemaId,
  });

  return (
    <AnimatedContainer className="h-full p-4">
      <ManagerHeader withBackButton>{cinemaDetails.data.name}</ManagerHeader>
      <div className="mt-3 w-full">
        <div className="my-3 w-3/6">
          <p className="font-poppins text-sm font-medium text-slate-600">
            Details
          </p>
        </div>

        <div
          className="flex snap-x gap-4 overflow-x-scroll"
          loading={cinemaDetails.isLoading}
          object="cinema details"
        >
          <div className="flex w-full snap-end items-center justify-start">
            <div className="grid w-96 grid-cols-2 gap-4">
              <CinemaDetailsCard
                title="Studios"
                value={cinemaDetails.data?.studioAmount}
              />
              <CinemaDetailsCard
                title="Movies"
                value={cinemaDetails.data?.movieAmount}
                withLink
                link={
                  "/manager/region/" + regionId + "/" + cinemaId + "/movies"
                }
              />
              <CinemaDetailsCard
                title="Showtimes"
                value={cinemaDetails.data?.showtimeAmount}
                withLink
                link={
                  "/manager/region/" + regionId + "/" + cinemaId + "/showtimes"
                }
              />
              <CinemaDetailsCard
                title="Capacity Total"
                value={cinemaDetails.data?.capacityTotal}
              />
            </div>
          </div>
          <div className="flex h-full w-full snap-end items-center justify-start">
            <div className="grid w-96 grid-cols-2 gap-4">
              <CinemaDetailsCard
                title="Admins"
                value={cinemaDetails.data?.admins.length}
                withLink
                link={
                  "/manager/region/" + regionId + "/" + cinemaId + "/admins"
                }
              />
              <CinemaDetailsCard
                title="Transactions"
                value={cinemaDetails.data?.transactionAmount}
              />
              <CinemaDetailsCard
                title="Showtimes"
                value={cinemaDetails.data?.showtimeAmount}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full">
        <div className="my-3 w-3/6">
          <p className="font-poppins text-sm font-medium text-slate-600">
            Ticket Sales
          </p>
        </div>
      </div>
      <DeleteCinemaModal
        regionId={regionId}
        cinemaId={cinemaId}
        show={showModal}
        toggleShow={toggleShowModal}
        text={cinemaDetails.name}
      />
    </AnimatedContainer>
  );
};

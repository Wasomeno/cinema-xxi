import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerHeader from "@/components/Headers/ManagerHeader";
import { useCinemaDetails } from "@/components/reactQuery/queries/Cinema/useCinemaDetails";

import CinemaDetailsCard from "./components/CinemaDetailsCard";
import DeleteCinemaModal from "./components/DeleteCinemaModal";

export const ManagerCinemaDetailsPage = () => {
  const { query } = useRouter();
  const [showModal, toggleShowModal] = useToggle(false);
  const cinemaDetails = useCinemaDetails({
    cinema: query?.cinemaId,
  });

  return (
    <AnimatedContainer className="h-screen p-4">
      <ManagerHeader withBackButton>{cinemaDetails.data?.name}</ManagerHeader>
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
                value={cinemaDetails.data?.studio?.length}
              />
              <CinemaDetailsCard
                title="Movies"
                value={cinemaDetails.data?.movie?.length}
                withLink
                link={
                  "/manager/region/" +
                  query?.regionId +
                  "/" +
                  query?.cinemaId +
                  "/movies"
                }
              />
              <CinemaDetailsCard
                title="Showtimes"
                value={cinemaDetails.data?.showtime?.length}
                withLink
                link={
                  "/manager/region/" +
                  query?.regionId +
                  "/" +
                  query?.cinemaId +
                  "/showtimes"
                }
              />
              <CinemaDetailsCard title="Capacity Total" value={"50"} />
            </div>
          </div>
          <div className="flex h-full w-full snap-end items-center justify-start">
            <div className="grid w-96 grid-cols-2 gap-4">
              <CinemaDetailsCard
                title="Admins"
                value={cinemaDetails.data?.admin?.length}
                withLink
                link={
                  "/manager/region/" +
                  query?.regionId +
                  "/" +
                  query?.cinemaId +
                  "/admins"
                }
              />
              <CinemaDetailsCard title="Transactions" value={50} />
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
        regionId={query?.regionId}
        cinemaId={query?.cinemaId}
        show={showModal}
        toggleShow={toggleShowModal}
        text={cinemaDetails.name}
      />
    </AnimatedContainer>
  );
};

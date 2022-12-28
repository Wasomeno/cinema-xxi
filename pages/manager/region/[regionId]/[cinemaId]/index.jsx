import { ethers } from "ethers";
import React from "react";
import AnimatedContainer from "../../../../../components/AnimatedContainer";
import CinemaDetailsCard from "../../../../../components/Manager/Cinema/CinemaDetailsCard";
import { CinemaManagerMenu } from "../../../../../components/Manager/Cinema/CinemaManagerMenu";
import ManagerDashboardHeader from "../../../../../components/Manager/ManagerDashboardHeader";
import { useCinemaDetails } from "../../../../../components/reactQuery/queries/Cinema/useCinemaDetails";
import { useCinemaTransactions } from "../../../../../components/reactQuery/queries/Cinema/useCinemaTransactions";

export const getServerSideProps = async (context) => {
  const { cinemaId, regionId } = context.query;
  const cinemaDetails = await useCinemaDetails({
    cinema: cinemaId,
    region: regionId,
  });
  const transactionsDetails = await useCinemaTransactions({
    region: regionId,
    cinema: cinemaId,
  });
  return {
    props: {
      cinemaDetails: cinemaDetails,
      transactionsDetails: transactionsDetails,
      cinemaId: cinemaId,
      regionId: regionId,
    },
  };
};

const CinemaDetails = ({
  cinemaDetails,
  transactionsDetails,
  cinemaId,
  regionId,
}) => {
  const capacityTotal = cinemaDetails.studioCapacities.reduce(
    (accummulator, value) => accummulator + parseInt(value.hex),
    0
  );

  return (
    <AnimatedContainer className="p-4 h-full">
      <ManagerDashboardHeader title={cinemaDetails.name} withBackButton />
      <div className="mt-3 w-full">
        <div className="my-3 w-3/6">
          <p className="font-medium font-poppins text-sm text-slate-600">
            Details
          </p>
        </div>
        <div className="flex snap-x h-2/6 gap-4 overflow-x-scroll">
          <div className="flex h-full justify-start items-center w-full snap-end">
            <div className="w-96 grid grid-cols-2 h-2/6 gap-4">
              <CinemaDetailsCard
                title="Studios"
                value={parseInt(cinemaDetails.studiosAmount.hex)}
              />
              <CinemaDetailsCard
                title="Movies"
                value={parseInt(cinemaDetails.moviesAmount.hex)}
              />
              <CinemaDetailsCard
                title="Showtimes"
                value={parseInt(cinemaDetails.showTimesAmount.hex)}
              />
              <CinemaDetailsCard title="Capacity Total" value={capacityTotal} />
            </div>
          </div>
          <div className="flex h-2/6 justify-start items-center w-full snap-end">
            <div className="w-96 grid grid-cols-2 h-2/6 gap-4">
              <CinemaDetailsCard
                title="Studios"
                value={parseInt(cinemaDetails.studiosAmount.hex)}
              />
              <CinemaDetailsCard
                title="Movies"
                value={parseInt(cinemaDetails.moviesAmount.hex)}
              />
              <CinemaDetailsCard
                title="Showtimes"
                value={parseInt(cinemaDetails.showTimesAmount.hex)}
              />
              <CinemaDetailsCard title="Capacity Total" value={capacityTotal} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full">
        <div className="my-3 w-3/6">
          <p className="font-medium font-poppins text-sm text-slate-600">
            Ticket Sales
          </p>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default CinemaDetails;

import { ethers } from "ethers";
import React from "react";
import AnimatedContainer from "../../../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../../../components/Manager/ManagerDashboardHeader";
import { useCinemaDetails } from "../../../../../components/reactQuery/queries/Cinema/useCinemaDetails";

export const getServerSideProps = async (context) => {
  const { cinemaId, regionId } = context.query;
  const cinemaDetails = await useCinemaDetails({
    cinema: cinemaId,
    region: regionId,
  });
  return {
    props: {
      cinemaDetails: JSON.parse(
        JSON.stringify({
          name: ethers.utils.parseBytes32String(cinemaDetails.name),
          studiosAmount: cinemaDetails.studioAmount,
          moviesAmount: cinemaDetails.moviesAmount,
          showTimesAmount: cinemaDetails.showTimesAmount,
          showTimes: cinemaDetails.showTimes,
          studioShowTimes: cinemaDetails.studioShowTimes,
          studioCapacities: cinemaDetails.studioCapacities,
        })
      ),
    },
  };
};

const CinemaDetails = ({ cinemaDetails }) => {
  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader title={cinemaDetails.name} withOption />
    </AnimatedContainer>
  );
};

export default CinemaDetails;

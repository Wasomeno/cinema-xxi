import React from "react";
import AnimatedContainer from "../../../../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../../../../components/Manager/ManagerDashboardHeader";

export const getServerSideProps = (context) => {
  const { regionId, cinemaId } = context.query;
  return {
    props: {
      region: regionId,
      cinema: cinemaId,
    },
  };
};

const ShowTimes = ({ region, cinema }) => {
  return (
    <AnimatedContainer>
      <ManagerDashboardHeader title="Showtimes" />
    </AnimatedContainer>
  );
};

export default ShowTimes;

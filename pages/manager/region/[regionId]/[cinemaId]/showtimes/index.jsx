import React from "react";
import AnimatedContainer from "../../../../../../components/AnimatedContainer";
import ManagerDashboardHeader from "../../../../../../components/Manager/ManagerDashboardHeader";
import { useShowTimes } from "../../../../../../components/reactQuery/queries/Cinema/useShowTimes";

export const getServerSideProps = async (context) => {
  const { regionId, cinemaId } = context.query;
  const showTimes = await useShowTimes({ region: regionId, cinema: cinemaId });
  return {
    props: {
      showTimes: showTimes,
      region: regionId,
      cinema: cinemaId,
    },
  };
};

const ShowTimes = ({ showTimes }) => {
  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader title="Showtimes" withBackButton />
      <div className="mt-5 mb-3 w-3/6">
        <p className="font-medium font-poppins text-sm text-slate-500">
          Showtimes list
        </p>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4">
        {showTimes.length < 1 ? (
          <p className="text-sm font-poppins font-medium">
            No active showtimes
          </p>
        ) : (
          showTimes.map((showtime) => <div>{showtime}</div>)
        )}
      </div>
    </AnimatedContainer>
  );
};

export default ShowTimes;

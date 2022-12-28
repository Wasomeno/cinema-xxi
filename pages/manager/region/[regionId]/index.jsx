import { ethers } from "ethers";
import React from "react";
import AnimatedContainer from "../../../../components/AnimatedContainer";
import CinemaList from "../../../../components/Manager/Cinema/CinemaList";
import ManagerDashboardHeader from "../../../../components/Manager/ManagerDashboardHeader";
import RegionDetailsMenu from "../../../../components/Manager/Region/RegionDetailsMenu";
import { useRegionDetailsSSR } from "../../../../components/reactQuery/queries/Region/useRegionDetails";

export const getServerSideProps = async (context) => {
  const { regionId } = context.query;
  const regionDetails = await useRegionDetailsSSR({ region: regionId });
  return {
    props: {
      regionId: regionId,
      regionDetails: JSON.parse(
        JSON.stringify({
          name: regionDetails._name,
          cinemasAmount: regionDetails._cinemasAmount,
          cinemas: regionDetails._cinemas,
        })
      ),
    },
  };
};

const RegionDetails = ({ regionId, regionDetails }) => {
  const bytesToString = (bytes) => {
    return ethers.utils.parseBytes32String(bytes);
  };

  return (
    <AnimatedContainer className="flex flex-col gap-5 h-full p-4">
      <ManagerDashboardHeader
        title={bytesToString(regionDetails.name)}
        withOption
        OptionMenu={RegionDetailsMenu}
      />
      <div className="w-full">
        <h2 className="text-xs font-medium font-poppins">List of Cinemas</h2>
        <hr className="w-2/6 border-t-2 border-slate-500 rounded-full mt-1" />
      </div>
      <CinemaList cinemas={regionDetails.cinemas} region={regionId} />
    </AnimatedContainer>
  );
};

export default RegionDetails;

import { useRouter } from "next/router";
import React from "react";
import AnimatedContainer from "../../../../../../components/AnimatedContainer";
import AdminListCard from "../../../../../../components/Manager/Admins/AdminListCard";
import AdminManagerMenu from "../../../../../../components/Manager/Admins/AdminManagerMenu";
import ManagerDashboardHeader from "../../../../../../components/Manager/ManagerDashboardHeader";
import { useCinemaAdmins } from "../../../../../../components/reactQuery/queries/Roles/useCinemaAdmins";
import { Paragraph, Subtitle } from "../../../../../../components/shared/Texts";

export const getServerSideProps = async (context) => {
  const { regionId, cinemaId } = context.query;
  const admins = await useCinemaAdmins({
    regionId: regionId,
    cinemaId: cinemaId,
  });
  return { props: { admins: admins } };
};

const CinemaAdmins = ({ admins }) => {
  const { query } = useRouter();
  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader
        title={"Cinema " + query.cinemaId + " Admins"}
        withBackButton
        withOption
        OptionMenu={() =>
          AdminManagerMenu({
            regionId: query.regionId,
            cinemaId: query.cinemaId,
          })
        }
      />
      <div className="p-2 my-4">
        <Subtitle text="List of Admins" size="sm" />
      </div>
      <div className="flex flex-col justify-start items-center gap-4">
        {admins.length < 1 ? (
          <Paragraph text="No Active Admins" size="sm" style="medium" />
        ) : (
          admins.map((admin) => <AdminListCard address={admin} />)
        )}
      </div>
    </AnimatedContainer>
  );
};

export default CinemaAdmins;

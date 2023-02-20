import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { useCinemaAdmins } from "@/components/reactQuery/queries/Roles/useCinemaAdmins";
import { Paragraph, Subtitle } from "@/components/shared/Texts";

import AdminListCard from "./AdminListCard";
import AdminManagerMenu from "./AdminManagerMenu";

export const CinemaAdminsPage = () => {
  const { regionId, cinemaId } = useRouter().query;
  const cinemaAdmins = useCinemaAdmins({
    regionId: regionId,
    cinemaId: cinemaId,
  });

  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader withBackButton>
        {"Cinema " + cinemaId + " Admins"}
      </ManagerDashboardHeader>
      <div className="my-4 p-2">
        <Subtitle text="List of Admins" size="sm" />
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-4"
        loading={cinemaAdmins.isLoading}
        object="admins"
      >
        {cinemaAdmins.data?.length < 1 ? (
          <Paragraph text="No Active Admins" size="sm" style="medium" />
        ) : (
          cinemaAdmins.data?.map((admin, index) => (
            <AdminListCard key={index} address={admin} />
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};

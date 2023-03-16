import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { ManagerSubHeader } from "@/components/ManagerSubHeader";
import { useCinemaAdmins } from "@/components/reactQuery/queries/Roles/useCinemaAdmins";
import { Paragraph } from "@/components/shared/Texts";

import AdminListCard from "./AdminListCard";
import AdminManagerMenu from "./AdminManagerMenu";

export const CinemaAdminsPage = () => {
  const { regionId, cinemaId } = useRouter().query;
  const [showMenu, toggleShowMenu] = useToggle(false);
  const cinemaAdmins = useCinemaAdmins(cinemaId);

  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader withBackButton>
        {"Cinema " + cinemaId + " Admins"}
      </ManagerDashboardHeader>
      <ManagerSubHeader object="admins" toggleShowMenu={toggleShowMenu} />
      <DataContainer
        className="flex flex-col items-center justify-start gap-3"
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
      {showMenu && <AdminManagerMenu toggleShowMenu={toggleShowMenu} />}
    </AnimatedContainer>
  );
};

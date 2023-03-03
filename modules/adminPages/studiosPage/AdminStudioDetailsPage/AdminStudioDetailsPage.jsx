import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import StudioDetailsMenu from "./StudioDetailsMenu";

export const AdminStudioDetailsPage = () => {
  const { studio } = useRouter().query;
  const [showMenu, toggleShowMenu] = useToggle(false);
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader withBackButton>{"Studio " + studio}</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <AdminSubHeader
            object="Studio Details"
            SubHeaderMenu={StudioDetailsMenu}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

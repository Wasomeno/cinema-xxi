import useToggle from "hooks/useToggle";

import { AdminSubHeader } from "@/components/AdminSubHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";

import { StudioList } from "./components/StudioList";
import { StudioListMenu } from "./components/StudioListMenu";

export const AdminStudioPage = () => {
  return (
    <AnimatedContainer className="h-screen p-4">
      <AdminHeader>Studios</AdminHeader>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/6">
          <AdminSubHeader object="studio" SubHeaderMenu={StudioListMenu} />
          <StudioList />
        </div>
      </div>
    </AnimatedContainer>
  );
};

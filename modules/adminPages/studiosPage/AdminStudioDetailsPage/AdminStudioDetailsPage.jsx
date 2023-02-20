import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import AdminHeader from "@/components/Headers/AdminHeader";
import { Subtitle } from "@/components/shared/Texts";

export const AdminStudioDetailsPage = () => {
  const { studio } = useRouter().query;
  return (
    <AnimatedContainer className="p-4">
      <AdminHeader withBackButton>{"Studio " + studio}</AdminHeader>
      <div className="my-4 flex justify-center">
        <div className="w-full lg:w-5/6">
          <Subtitle size="xs">Studio Details</Subtitle>
        </div>
      </div>
    </AnimatedContainer>
  );
};

import AdminHeader from "@/components/Admin/AdminHeader";
import { useUserDetails } from "hooks/useUserDetails";
import React, { useContext } from "react";
import AnimatedContainer from "../../components/AnimatedContainer";

const index = () => {
  const { user } = useUserDetails();
  return (
    <AnimatedContainer className="flex flex-col items-center justify-start w-full h-5/6 p-4">
      <AdminHeader title="Admin Dashboard" />
    </AnimatedContainer>
  );
};

export default index;

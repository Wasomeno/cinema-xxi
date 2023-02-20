import AnimatedContainer from "@/components/AnimatedContainer";
import ManagerDashboardHeader from "@/components/Headers/ManagerHeader";
import { addCinemaAdmin } from "@/components/reactQuery/mutations/Roles/addCinemaAdmin";
import {
  FormContainer,
  FormInput,
  FormSubmit,
} from "@/components/shared/Forms";
import { Paragraph } from "@/components/shared/Texts";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AddCinemaAdminPage = () => {
  const { regionId, cinemaId } = useRouter().query;
  const [adminAddress, setAdminAddress] = useState("");

  return (
    <AnimatedContainer className="p-4">
      <ManagerDashboardHeader title="Add Cinema Admin" withBackButton />
      <FormContainer onSubmit={console.log("test")}>
        <div className="w-3/6 text-center">
          <Paragraph text="Admin Address" size="sm" style="medium" margin="3" />
          <FormInput
            type="text"
            value={adminAddress}
            setValue={setAdminAddress}
            width="full"
          />
        </div>
        <div className="w-2/6">
          <FormSubmit value="Submit" />
        </div>
      </FormContainer>
    </AnimatedContainer>
  );
};

export default AddCinemaAdminPage;

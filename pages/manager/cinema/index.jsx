import React from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerHeader from "../../../components/Manager/ManagerHeader";
import { Title } from "../../../shared/Texts";

const ManageCinema = () => {
  return (
    <AnimatedContainer className="w-full h-full p-4">
      <ManagerHeader title="Manage Cinemas" />
    </AnimatedContainer>
  );
};

export default ManageCinema;

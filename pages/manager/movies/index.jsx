import React from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import ManagerHeader from "../../../components/Manager/ManagerHeader";

const ManageMovies = () => {
  return (
    <AnimatedContainer className="w-full h-full p-4">
      <ManagerHeader title="Manage Movies" />
    </AnimatedContainer>
  );
};

export default ManageMovies;

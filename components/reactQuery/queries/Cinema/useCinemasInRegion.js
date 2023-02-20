import React from "react";
import { useQuery } from "wagmi";
import { cinemaContract } from "../../../../hooks/useContract";

const useCinemasInRegion = ({ region }) => {
  const contract = cinemaContract();
  const {} = useQuery(["cinemasInRegion", region], async () => {});
  return <div>useCinemasInRegion</div>;
};

export default useCinemasInRegion;

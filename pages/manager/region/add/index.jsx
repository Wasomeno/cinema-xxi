import React, { useState } from "react";
import AnimatedContainer from "../../../../components/AnimatedContainer";
import { addRegion } from "../../../../components/reactQuery/mutations/Region/addRegion";
import ManagerDashboardHeader from "../../../../components/Manager/ManagerDashboardHeader";
import { Title } from "../../../../components/shared/Texts";

const AddRegion = () => {
  const [regionName, setRegionName] = useState("");
  const [regionId, setRegionId] = useState("");

  const regionNameFormHandler = (text) => {
    if (text.length > 15) return;
    setRegionName(text);
  };

  const regionIdFormHandler = (id) => {
    if (id.length > 3) return;
    setRegionId(id);
  };

  const addRegionMutation = addRegion({
    regionId: regionId,
    regionName: regionName,
  });

  return (
    <AnimatedContainer className="w-full flex flex-col justify-center items-center gap-4 p-4">
      <ManagerDashboardHeader title="Add New Region" />
      <div className="w-full text-center">
        <p className="font-poppins text-sm font-medium m-2">Region ID</p>
        <input
          type="number"
          value={regionId}
          className="w-3/6 h-8 p-2 font-poppins bg-slate-100 rounded-md shadow text-sm text-center"
          onChange={(event) => regionIdFormHandler(event.target.value)}
        />
      </div>

      <div className="w-full text-center">
        <p className="font-poppins text-sm font-medium m-2">Region Name</p>
        <input
          type="text"
          value={regionName}
          className="w-4/6 h-8 p-2 font-poppins text-sm text-center bg-slate-100 rounded-md shadow"
          onChange={(event) => regionNameFormHandler(event.target.value)}
        />
      </div>

      <div className="w-5/6 text-center">
        <button
          className="w-4/6 rounded-md p-3 bg-slate-900 text-white font-poppins text-xs font-medium"
          onClick={addRegionMutation}
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

export default AddRegion;

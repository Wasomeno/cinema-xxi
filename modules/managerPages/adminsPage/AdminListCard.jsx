import React from "react";
import { Paragraph } from "@/components/shared/Texts";

const AdminListCard = ({ address }) => {
  return (
    <div className="w-4/6 flex justify-center items-center h-12 bg-slate-400 p-2 rounded-md">
      <div className="text-center">
        <Paragraph
          text={address.slice(0, 12) + "...."}
          size="sm"
          style="medium"
        />
      </div>
    </div>
  );
};

export default AdminListCard;

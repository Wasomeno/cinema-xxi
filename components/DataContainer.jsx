import React from "react";
import { MoonLoader } from "react-spinners";
import { Paragraph } from "./shared/Texts";

const DataContainer = ({ className, object, loading, children }) => {
  return (
    <div className={className}>
      {loading ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          <Paragraph text={"Fetching " + object} size="sm" style="medium" />
          <MoonLoader loading={loading} size="20px" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default DataContainer;

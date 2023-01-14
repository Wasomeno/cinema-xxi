import AnimatedContainer from "@/components/AnimatedContainer";
import { Paragraph, Title } from "@/components/shared/Texts";
import useToggle from "hooks/useToggle";
import React from "react";

const profile = () => {
  const [activeTab, toggleActiveTab] = useToggle(false);
  return (
    <AnimatedContainer className="p-4 w-full">
      <div className="text-center mb-2">
        <Title text="Ticket Details" />
      </div>
      <div className="flex justify-center items-center my-2 rounded-lg shadow-md bg-slate-100">
        <div
          onClick={() => activeTab && toggleActiveTab()}
          className={
            "w-3/6 p-2 text-center rounded-l-lg transition duration-200 ease-in-out " +
            (!activeTab && "bg-slate-400")
          }
        >
          <Paragraph text="Active Tickets" size="xs" style="medium" />
        </div>
        <div
          onClick={() => !activeTab && toggleActiveTab()}
          className={
            "w-3/6 p-2 text-center rounded-r-lg transition duration-200 ease-in-out " +
            (activeTab && "bg-slate-400")
          }
        >
          <Paragraph text="Ticket History" size="xs" style="medium" />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default profile;

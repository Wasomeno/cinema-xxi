import { Paragraph } from "@/components/shared/Texts";

const TicketPageTab = ({ activeTab, toggleActiveTab }) => {
  return (
    <div className="my-2 flex items-center justify-center rounded-lg bg-slate-100 shadow-md">
      <div
        onClick={() => activeTab && toggleActiveTab()}
        className={
          "w-3/6 rounded-l-lg p-2 text-center transition duration-200 ease-in-out " +
          (!activeTab && "bg-slate-900 text-white")
        }
      >
        <Paragraph size="xs" style="medium">
          Active Tickets
        </Paragraph>
      </div>
      <div
        onClick={() => !activeTab && toggleActiveTab()}
        className={
          "w-3/6 rounded-r-lg p-2 text-center transition duration-200 ease-in-out " +
          (activeTab && "bg-slate-900 text-white")
        }
      >
        <Paragraph size="xs" style="medium">
          Ticket History
        </Paragraph>
      </div>
    </div>
  );
};

export default TicketPageTab;

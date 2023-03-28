import { Paragraph } from "@/components/shared/Texts";

const TicketPageTab = ({ activeTab, toggleActiveTab }) => {
  return (
    <div className="relative flex h-full items-center justify-center border-t-2 border-t-slate-200 bg-slate-50 text-slate-900 shadow-md dark:bg-slate-600 dark:text-slate-50">
      <div
        onClick={() => activeTab && toggleActiveTab()}
        className={
          "flex h-full w-3/6 items-center justify-center transition duration-200 ease-in-out"
        }
      >
        <Paragraph size="xs" style="medium">
          Active Tickets
        </Paragraph>
      </div>
      <div
        onClick={() => !activeTab && toggleActiveTab()}
        className={
          "flex h-full w-3/6 items-center justify-center text-center transition duration-200 ease-in-out"
        }
      >
        <Paragraph size="xs" style="medium">
          Ticket History
        </Paragraph>
      </div>

      <span
        className={
          "absolute bottom-0 h-0.5 w-3/6 rounded-full bg-slate-900 transition duration-300 dark:bg-slate-100" +
          " " +
          (!activeTab ? "left-0" : "right-0")
        }
      />
    </div>
  );
};

export default TicketPageTab;

import { Line } from "react-chartjs-2";

import { ChartComponent } from "@/components/ChartComponent";
import { query } from "@/components/reactQuery/queries/query";

export const RegionChartSection = ({ region }) => {
  const month = 1;
  const ticketSales = query({
    queryKey: ["regionDetails", region.id, "sales"],
    url: `/api/regions/${region.id}/sales/${month}`,
  });
  return (
    <div className="mb-4 flex items-center justify-center gap-2 lg:flex-nowrap">
      <div className="w-full lg:w-4/6">
        {ticketSales.isLoading ? (
          <div className="h-72 w-full animate-pulse rounded-lg bg-slate-200" />
        ) : (
          <ChartComponent
            Chart={Line}
            labels={ticketSales.data?.map((sale) => sale.date)}
            data={ticketSales.data?.map((sale) => sale.total)}
            legend="Ticket Sales"
          />
        )}
      </div>
    </div>
  );
};

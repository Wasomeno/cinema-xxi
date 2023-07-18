import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { twMerge } from "tailwind-merge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement
);

export const options = {
  responsive: true,
};

export const ChartComponent = ({ Chart, legend, data, labels }) => {
  const tableData = {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-center gap-2",
        !data && "animate-pulse blur-sm"
      )}
    >
      <Chart options={options} data={tableData} />
      <span className="text-xs font-medium">{legend}</span>
    </div>
  );
};

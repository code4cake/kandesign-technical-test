import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useChartData } from "@/hooks/useChartData";
import { useGraphData } from "@/api/useGraphData";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export function Graph() {
  const { isPending, error, data, isFetching } = useGraphData();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const { chartData, chartOptions } = useChartData(data);

  return (
    <section className="flex justify-center items-center m-auto align-center pt-10">
      <div>{isFetching ? "Updating..." : ""}</div>
      <div style={{ width: "1000px", height: "500px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}

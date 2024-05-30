import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

import type { Parameter as IParameter } from "@/types/GraphData";
import { useChartData } from "@/hooks/useChartData";
import { useGraphData } from "@/api/useGraphData";
import { Parameter } from "./paramater";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  TimeScale
);

export function Graph() {
  const { isPending, error, data, isFetching } = useGraphData();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const { chartData, chartOptions } = useChartData(data);

  return (
    <>
      <div>{isFetching ? "Updating..." : ""}</div>

      <article className="flex gap-5 justify-items-center justify-center dark text-center">
        {data.parameters.map((parameter: IParameter) => (
          <Parameter parameter={parameter} />
        ))}
      </article>

      <div style={{ width: "1000px", height: "500px" }} className="p-10">
        <Line data={chartData} options={chartOptions} color="#fafafa" />
      </div>
    </>
  );
}

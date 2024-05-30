import type { GraphData, LineData } from "@/types/LineData";
import { formatDateTime } from "@/utils/formatDateTime";

export const useChartData = (data: GraphData) => {
  const processedData = data.lineData.map((item) => ({
    ...item,
    datetime: formatDateTime(item.datetime),
  }));

  const chartData = {
    labels: processedData.map((item) => item.datetime),
    datasets: [
      {
        label: "GCV",
        data: processedData.map((item: LineData) => item.GCV),
        borderColor: processedData.map((item: LineData) =>
          item.GCV >= item.S1 && item.GCV <= item.S2 ? "green" : "red"
        ),
        borderWidth: 2,
        pointRadius: 0,
        segment: {
          borderColor: (ctx: any) => {
            const index = ctx.p0DataIndex;
            return processedData[index].GCV >= processedData[index].S1 &&
              processedData[index].GCV <= processedData[index].S2
              ? "green"
              : "red";
          },
        },
      },
      {
        label: "S1",
        data: processedData.map((item: LineData) => item.S1),
        borderColor: "blue",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "S2",
        data: processedData.map((item: LineData) => item.S2),
        borderColor: "blue",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0,
        max: 200,
        title: {
          display: true,
          text: "Glucose Level",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
  };

  return { chartData, chartOptions };
};

import type { GraphData, LineData } from "@/types/GraphData";
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
          item.GCV >= item.S1 && item.GCV <= item.S2
            ? "hsla(20.5 90.2% 48.2%)"
            : "red"
        ),
        borderWidth: 2,
        pointRadius: 0,
        segment: {
          borderColor: (ctx: any) => {
            const index = ctx.p0DataIndex;
            return processedData[index].GCV >= processedData[index].S1 &&
              processedData[index].GCV <= processedData[index].S2
              ? "hsla(20.5 90.2% 48.2%)"
              : "red";
          },
        },
      },
      {
        label: "S1",
        data: processedData.map((item: LineData) => item.S1),
        borderColor: "#fafafa",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "S2",
        data: processedData.map((item: LineData) => item.S2),
        borderColor: "#fafafa",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 200,
        title: {
          display: true,
          text: "Glucose Level",
          color: "#fafafa",
          font: {
            size: 18,
            family: "Fira Sans Extra Condensed",
          },
        },
        ticks: {
          color: "#fafafa",
          font: {
            size: 14,
            family: "Fira Sans Extra Condensed",
          },
        },
        grid: {
          color: "hsla(12 6.5% 15.1%)",
        },
        border: {
          display: true,
          color: "hsla(12 6.5% 15.1%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time of Day",
          color: "#fafafa",
          font: {
            size: 18,
            family: "Fira Sans Extra Condensed",
          },
        },
        ticks: {
          color: "#fafafa",
          font: {
            size: 14,
            font: {
              family: "Fira Sans Extra Condensed",
            },
          },
        },
        grid: {
          color: "hsla(12 6.5% 15.1%)",
          borderColor: "hsla(12 6.5% 15.1%)",
        },
        border: {
          display: true,
          color: "hsla(12 6.5% 15.1%)",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        color: "#fafafa",
        font: {
          family: "Fira Sans Extra Condensed",
        },
      },
      legend: {
        labels: {
          color: "#fafafa",
          font: {
            family: "Fira Sans Extra Condensed",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
        color: "#fafafa",
      },
    },
  };

  return { chartData, chartOptions };
};

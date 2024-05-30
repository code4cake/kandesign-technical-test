import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  Customized,
} from "recharts";

export function Graph() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["graphData"],
    queryFn: () =>
      axios
        .get(
          "https://raw.githubusercontent.com/robbe-nees/health-X/main/dummy-health-data.json"
        )
        .then((res) => {
          return res.data;
        }),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data.lineData);

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const processedData = data.lineData.map((item: any) => ({
    ...item,
    average: (item.S1 + item.S2) / 2,
    datetime: formatDateTime(item.datetime),
    // isAverageGreaterThanGCV:
    //   (item.S1 + item.S2) / 2 > item.GCV ? "red" : "green",
    stroke: (item.S1 + item.S2) / 2 > item.GCV ? "red" : "green",
  }));

  //   const dataAbove = processedData.map((item) => ({
  //     ...item,
  //     average: item.average > item.GCV ? item.average : null,
  //   }));

  //   const dataBelow = processedData.map((item) => ({
  //     ...item,
  //     average: item.average <= item.GCV ? item.average : null,
  //   }));

  const renderCustomized = (props: any) => {
    const { points } = props;

    return (
      <g>
        {points.map((entry: any, index: number) => {
          const nextEntry = points[index + 1];
          if (nextEntry) {
            const currentStroke = processedData[index].stroke;
            return (
              <line
                key={`line-${index}`}
                x1={entry.x}
                y1={entry.y}
                x2={nextEntry.x}
                y2={nextEntry.y}
                stroke={currentStroke}
                strokeWidth={2}
              />
            );
          }
          return null;
        })}
      </g>
    );
  };

  return (
    <section className="flex  justify-center items-center m-auto align-center pt-10">
      <div>{isFetching ? "Updating..." : ""}</div>

      <LineChart
        width={1000}
        height={500}
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" minTickGap={25} padding={"gap"}>
          <Label value="Date" offset={0} position="bottom" />
        </XAxis>
        <YAxis dataKey={"GCV"}>
          <Label
            value="GCV"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />

        <Line
          type="monotone"
          dataKey="average"
          stroke="#8884d8"
          //   stroke={processedData.map((item: any) =>
          //     item.isAverageGreaterThanGCV ? "#8884d8" : "#ddd"
          //   )}

          activeDot={{ r: 8 }}
        />

        {/* 
        <Line
          type="monotone"
          dataKey="average"
          data={dataAbove}
          stroke="red"
          connectNulls={true}
          activeDot={{ r: 8 }}
          name="Average > GCV"
        />
        <Line
          type="monotone"
          dataKey="average"
          data={dataBelow}
          stroke="#8884d8"
          connectNulls={true}
          activeDot={{ r: 8 }}
          name="Average <= GCV"
        /> */}
        <Customized component={renderCustomized} />
      </LineChart>
      {/* <Legend verticalAlign="bottom" height={36} />
      <Line
        name="S1 en S2 average"
        type="monotone"
        dataKey="average"
        stroke="#8884d8"
      /> */}
    </section>
  );
}

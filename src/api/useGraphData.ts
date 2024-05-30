import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const fetchGraphData = () => {
  return axios
    .get(
      "https://raw.githubusercontent.com/robbe-nees/health-X/main/dummy-health-data.json"
    )
    .then((res) => res.data);
};

export const useGraphData = () => {
  return useQuery({
    queryKey: ["graphData"],
    queryFn: fetchGraphData,
  });
};

import { fetcherLineGraph } from "@/functions";
import useSWR from "swr";

function LineGraph() {
  const { data, error } = useSWR(
    "http://localhost:3000/api/pairs_data/btcusd",
    fetcherLineGraph,
    { refreshInterval: 10000 }
  );
  console.log(data);
  return <div>adsf</div>;
}

export default LineGraph;

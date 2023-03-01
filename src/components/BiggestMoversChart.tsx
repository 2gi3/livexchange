import { BiggestMoversChartProps } from "@/types";
import * as d3 from "d3";

function BiggestMoversChart({ biggestMovers }: BiggestMoversChartProps) {
  console.log(biggestMovers);

  return (
    <div>
      <h2>{biggestMovers![0].pair}</h2>
      <p>{biggestMovers![0].percent_change_24}</p>
    </div>
  );
}

export default BiggestMoversChart;

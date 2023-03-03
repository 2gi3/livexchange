import { BiggestMoversChartProps } from "@/types";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

function BiggestMoversChart({ biggestMovers }: BiggestMoversChartProps) {
  console.log(biggestMovers);
  const svgViewPort = useRef<SVGSVGElement | null>(null);
  const viewPortWidth = 300;
  const viewPortHeight = 250;

  useEffect(() => {
    const viewPort = d3
      .select(svgViewPort.current)
      .attr("width", viewPortWidth)
      .attr("height", viewPortHeight)
      .attr("overflow", "visible");

    const xScale = d3.scaleBand().domain(biggestMovers.map());
  }, []);

  return (
    <div>
      <svg ref={svgViewPort}></svg>
      <h2>{biggestMovers![0].pair}</h2>
      <p>{biggestMovers![0].percent_change_24}</p>
    </div>
  );
}

export default BiggestMoversChart;

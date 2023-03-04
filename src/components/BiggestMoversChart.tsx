import styles from "@/styles/biggestMovers.module.css";
import { BiggestMoversChartProps } from "@/types";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

function BiggestMoversChart({ biggestMovers }: BiggestMoversChartProps) {
  console.log(biggestMovers);
  const svgViewPort = useRef<SVGSVGElement | null>(null);
  const viewPortWidth = 300;
  const viewPortHeight = 176;

  useEffect(() => {
    const viewPort = d3
      .select(svgViewPort.current)
      .attr("width", viewPortWidth)
      .attr("height", viewPortHeight)
      .attr("overflow", "visible");
    // .attr("margin-top", "50px");

    const xScale = d3
      .scaleBand()
      .domain(biggestMovers.map((val, i) => val.pair))
      .range([0, viewPortWidth])
      .padding(0.5);

    const xAxis = d3.axisBottom(xScale).ticks(biggestMovers.length);

    viewPort
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${viewPortHeight})`);

    viewPort
      .selectAll(".bar")
      .data(biggestMovers)
      .join("g")
      .attr("class", "bar")
      .attr(
        "transform",
        (val) =>
          `translate(${xScale(val.pair)}, ${
            viewPortHeight - -val.percent_change_24 * 10
          })`
      )
      .call((g) =>
        g
          .append("rect")
          .attr("width", "44px")
          .attr("height", (val) => -val.percent_change_24 * 10)
          .attr("fill", "#00DB06")
      )
      .call((g) =>
        g
          .append("text")
          // .attr("class", "label")
          .attr("y", (val) => -val.percent_change_24 * 10 - 4)
          // .attr("dy", "0px")
          .text((val) => val.percent_change_24.toFixed(2))
      );
  }, []);

  return (
    <div className="bg-red-700 m-11">
      <svg className={styles.biggestMoversGraph} ref={svgViewPort}></svg>
    </div>
  );
}

export default BiggestMoversChart;

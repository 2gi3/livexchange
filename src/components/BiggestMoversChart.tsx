import { BiggestMoversChartProps, BiggestMoversPair } from "@/types";
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
      .attr("overflow", "visible")
      .attr("margin-top", "50px");

    const xScale = d3
      .scaleBand()
      .domain(biggestMovers.map((val, i) => val.pair))
      .range([0, viewPortWidth])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(biggestMovers, (val) => val.percent_change_24)])
      .range([viewPortHeight, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(biggestMovers.length);

    // const yAxis = d3.axisLeft(yScale).ticks(3);

    viewPort
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${viewPortHeight})`);

    // viewPort.append("g").call(yAxis);

    viewPort;
    // .selectAll(".bar")
    // .data(biggestMovers)
    // .join("rect")
    // .attr("x", (v) => xScale(v.pair))
    // // .attr("y", (v) => yScale(v.percent_change_24))
    // .attr("width", "44px")
    // .attr("height", (val) => -val.percent_change_24 * 10)
    // .attr(
    //   "transform",
    //   (val) => `translate(0, ${viewPortHeight - -val.percent_change_24 * 10})`
    // )
    // .attr("fill", "#00DB06");

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
          .attr("class", "label")
          .attr("y", (val) => -val.percent_change_24 * 10 - 4)
          .attr("dy", "0.35em")
          .text((val) => val.percent_change_24.toFixed(2) + "%")
      );
  }, []);

  return (
    <div>
      <svg ref={svgViewPort}></svg>
      {/* <h2>{biggestMovers![0].pair}</h2>
      <p>{biggestMovers![0].percent_change_24}</p> */}
    </div>
  );
}

export default BiggestMoversChart;

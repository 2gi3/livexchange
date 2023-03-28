import { PairContext } from "../context/pairContext";
import { fetcherLineGraph } from "../functions";
import { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
// import * as d3 from "d3";
import { scaleLinear, scaleBand, scaleTime } from "d3-scale";
import { curveCardinal, line } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { timeParse } from "d3-time-format";
import { D3SVGElement, FormattedLineGraphData, LineGraphData } from "../types";
import { extent, max, min } from "d3";

function LineGraph({ initialValue }: any) {
  const svgRef = useRef<SVGSVGElement>(null);

  // get and manage data
  const { secectedPair } = useContext(PairContext);
  const endpoint = secectedPair.replace("/", "").toLowerCase();
  const [graphData, setGraphData] = useState<any[] | FormattedLineGraphData[]>(
    []
  );
  const { data, error } = useSWR(
    `https://livexchange.netlify.app/api/pairs_data/${endpoint}`,
    fetcherLineGraph,
    { refreshInterval: 10000 }
  );

  useEffect(() => {
    setGraphData((prevGraphData): any => {
      const newGraphData = [...prevGraphData, data].slice(-10);
      return newGraphData;
    });

    console.log(graphData);
  }, [data]);
  useEffect(() => {
    setGraphData(initialValue);
  }, [initialValue]);

  // create grapth
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 376 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  useEffect(() => {
    console.log("graph data updated:", graphData);

    const svg = select(svgRef.current);

    const filteredTimestampData = graphData.filter((d) => !!d.timestamp);
    const x = scaleTime()
      .domain([
        min(filteredTimestampData, (d) => new Date(parseInt(d.timestamp)))!,
        max(filteredTimestampData, (d) => new Date(parseInt(d.timestamp)))!,
      ])
      .range([margin.left, width - margin.right]);

    const filteredLastData = graphData.filter((d) => !!d.last);
    const y = scaleLinear()
      .domain([
        min(filteredLastData, (d) => parseInt(d.last))!,
        max(filteredLastData, (d) => parseInt(d.last))!,
      ])
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g: D3SVGElement) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(axisBottom(x));

    const yAxis = (g: D3SVGElement) =>
      g.attr("transform", `translate(${margin.left},0)`).call(axisLeft(y));

    const lineGenerator = line<FormattedLineGraphData>()
      .x((d) => x(new Date(parseInt(d.timestamp))))
      .y((d) => y(parseInt(d.last)));

    svg
      .select(".x-axis")
      .transition()
      .duration(1000)
      .call(xAxis as any)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .select(".y-axis")
      .transition()
      .duration(1000)
      .call(yAxis as any);

    svg
      .select(".line")
      .datum(graphData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator as any);
  }, [graphData, margin, width, height]);

  return (
    <div className="ml-[-19px]">
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
        <path className="line" />
      </svg>
    </div>
  );
}

export default LineGraph;

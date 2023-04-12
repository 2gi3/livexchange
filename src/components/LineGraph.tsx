import { PairContext } from "../context/pairContext";
import { fetcherLineGraph } from "../functions";
import React, { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { timeParse } from "d3-time-format";
import { D3SVGElement, FormattedLineGraphData, LineGraphData } from "../types";
import { max, min } from "d3";

function LineGraph({ initialValue }: any) {
  const svgRef = useRef<SVGSVGElement>(null);

  const { secectedPair } = useContext(PairContext);
  const endpoint = secectedPair.replace("/", "").toLowerCase();
  const [graphData, setGraphData] = useState<any[] | FormattedLineGraphData[]>(
    initialValue
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
  }, [data]);
  useEffect(() => {
    setGraphData(initialValue);
  }, [initialValue]);

  // create grapth
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 400 - margin.left - margin.right;
  const height = 270 - margin.top - margin.bottom;
  const graphPadding = 10;

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll(".text").remove();

    const filteredTimestampData = graphData.filter((d) => !!d.timestamp);
    const parseTime = timeParse("%s");
    const x = scaleTime()
      .domain([
        min(filteredTimestampData, (d) => parseTime(d.timestamp))!,
        max(filteredTimestampData, (d) => parseTime(d.timestamp))!,
      ])
      .range([margin.left + graphPadding, width - margin.right]);

    const filteredLastData = graphData.filter((d) => !!d.last);
    const y = scaleLinear()
      .domain([
        min(filteredLastData, (d) => Number(d.last))!,
        max(filteredLastData, (d) => Number(d.last))!,
      ])
      .range([height - margin.bottom - graphPadding, margin.top]);

    const xAxis = (g: D3SVGElement) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(axisBottom(x));

    const yAxis = (g: D3SVGElement) =>
      g.attr("transform", `translate(${margin.left},0)`).call(axisLeft(y));

    const lineGenerator = line<FormattedLineGraphData>()
      .x((d) => x(parseTime(d.timestamp)!))
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

    console.log(graphData[graphData.length - 1]);

    svg
      .append("text")
      .attr("class", "text")
      .attr("x", x(parseTime(graphData[graphData.length - 1].timestamp)!) - 20)
      .attr("y", y(parseInt(graphData[graphData.length - 1].last)))
      .text(`${graphData[graphData.length - 1].last}`)
      .attr("font-size", `12px`)
      .attr("margin-left", "-20px");
  }, [graphData, margin, width, height]);

  return (
    <div className="ml-[-46px] overflow-hidden w-80 mt-11 ">
      <h3 className="text-center">Graph updates every 10s</h3>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
        <path className="line" />
        <text className="text" />
      </svg>
    </div>
  );
}

export default LineGraph;

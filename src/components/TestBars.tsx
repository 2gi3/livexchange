import * as d3 from "d3";

function BarChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.pair));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, (d) => d.percent_change_24)]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Percent Change");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.pair))
      .attr("y", (d) => y(d.percent_change_24))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.percent_change_24))
      .attr("fill", "#69b3a2");
  }, [data]);

  return <svg ref={svgRef} width="500" height="300"></svg>;
}

export default function Chart() {
  const data = [
    {
      pair: "LTC/USD",
      percent_change_24: 2.57,
    },
    {
      pair: "BTC/USD",
      percent_change_24: 0.74,
    },
    {
      pair: "XRP/EUR",
      percent_change_24: 0.06,
    },
  ];

  return <BarChart data={data} />;
}

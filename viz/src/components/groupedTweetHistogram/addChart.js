import * as d3 from "d3";

export const addChart = (yValues, svg, container) => {
  let margin = { top: 10, right: 30, bottom: 30, left: 60 };
  let height =
    container.getBoundingClientRect().height - margin.bottom - margin.top;
  let width =
    container.getBoundingClientRect().width - margin.left - margin.right;

  let xValues = ["Bitcoin", "Tesla", "Dogecoin"];

  const xScale = d3.scaleBand().range([0, width]).padding(0.5).domain(xValues);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yValues)])
    .range([height, 0]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickFormat((d) => d));

  svg.append("g").attr("transform", "translate(0,0)").call(d3.axisLeft(yScale));

  const I = [0, 1, 2];

  svg
    .selectAll(".bar")
    .data(I)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (i) {
      return xScale(xValues[i]);
    })
    .attr("y", function (i) {
      return yScale(yValues[i]);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (i) {
      return height - yScale(yValues[i]);
    });
};
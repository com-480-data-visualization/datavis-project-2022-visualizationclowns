import * as d3 from "d3";

export const addChart = (Y, svg, container) => {
  const margin = { top: 10, right: 30, bottom: 40, left: 60 };
  const height = container.getBoundingClientRect().height - margin.bottom ;
  const width = container.getBoundingClientRect().width - margin.bottom;

  const I = [0, 1, 2];
  const X = ["Bitcoin", "Tesla", "Dogecoin"];

  const x = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .padding(0.5)
    .domain(X);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(Y)])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat((d) => d));

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width/2)
    .attr("y", height - 6)
    .text("Assets");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("x", -20)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Average Engagement Per Type of Tweet");

  svg
    .selectAll(".bar")
    .data(I)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (i) => x(X[i]))
    .attr("y", (i) => y(Y[i]))
    .attr("width", x.bandwidth())
    .attr("height", (i) => height - margin.bottom - y(Y[i]))
    .on("mouseover", function (d, i) {
      d3.select(this).attr("style", "fill: darkblue;");
      const xPosition = parseFloat(d3.select(this).attr("x"));
      const yPosition = parseFloat(d3.select(this).attr("y"));
      svg
        .append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition + 25)
        .attr("y", yPosition + 16)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .text(Y[i]);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("style", "outline: thin solid clear;");
      d3.select("#tooltip").remove();
    });
   };

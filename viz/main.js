import "./style.css";
import * as d3 from "d3";

// document.querySelector("#app").innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

(async () => {
  const crypto = await d3.csv("./assets/coin_Bitcoin.csv");

  let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width =
      document.body.getBoundingClientRect().width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3
    .scaleTime()
    .domain(
      d3.extent(crypto, function (d) {
        return new Date(d.Date);
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(crypto, function (d) {
        return +d.Close;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("path")
    .datum(crypto)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(new Date(d.Date));
        })
        .y(function (d) {
          return y(d.Close);
        })
    );
})();

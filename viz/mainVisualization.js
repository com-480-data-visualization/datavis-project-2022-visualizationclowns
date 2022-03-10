import "./style.css";
import * as d3 from "d3";

export const generateTweetsVsPrice = (tweets, crypto) => {
  tweets = tweets.filter((tweet) =>
    tweet.tweet.match(new RegExp(`.*([b,B]itcoin|BTC).*`))
  );

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

  const mouseLine = svg.append("g").attr("class", "mouse-over-effects");

  mouseLine
    .append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  mouseLine
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .attr("cursor", "none")
    .on("mouseout", function () {
      d3.select(".mouse-line").style("opacity", "0");
    })
    .on("mouseover", function () {
      d3.select(".mouse-line").style("opacity", "1");
    })
    .on("mousemove", function (event) {
      const offset = mouseLine.node().getBoundingClientRect();

      const mouse = [event.layerX, event.layerY];

      d3.select(".mouse-line").attr("d", function () {
        let d = "M" + (mouse[0] - offset.x) + "," + height;
        d += " " + (mouse[0] - offset.x) + "," + 0;
        return d;
      });
    });

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
};

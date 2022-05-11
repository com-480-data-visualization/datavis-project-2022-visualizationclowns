import React, { useEffect, useRef } from "react";
import css from "./MainChart.module.css";
import * as d3 from "d3";
import { addTweetBox } from "../../utils/addTweet";

const MainChart = ({ asset, tweets }) => {
  let price = asset.slice(-1000); //TODO filter based on time?
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };

  const graphRef = useRef(null);
  const tweetsRef = useRef(null);
  const containerRef = useRef(null);

  // Add rolling average to data
  const n = 50;
  for (let i = 0; i < price.length; i++) {
    price[i].rollingaverage =
      price.slice(i - n, i).reduce((sum, d) => sum + +d.Close, 0) / n;
  }

  useEffect(() => {
    if (!graphRef.current || !tweetsRef.current || !containerRef.current)
      return;

    // Get width and height of containers
    const width =
      containerRef.current.getBoundingClientRect().width -
      margin.left -
      margin.right -
      468;
    const height = 400 - margin.top - margin.bottom;

    // Create the graph and tweet svgs
    d3.selectAll(".main-chart-group").remove();

    const svg = d3
      .select(graphRef.current)
      .append("g")
      .attr("class", "main-chart-group");

    const tweetsSvg = d3.select(tweetsRef.current);

    // Add cliping for clipping lines correclty during zooming
    const clip = svg
      .append("clipPath")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

    // Add zooming
    const zoom = d3
      .zoom()
      .scaleExtent([1, 7])
      .extent([
        [margin.left, 0],
        [width - margin.right, 0],
      ])
      .translateExtent([
        [margin.left, -Infinity],
        [width - margin.right, Infinity],
      ])
      .on("zoom", zoomed);

    svg.call(zoom).on("mousedown.zoom", null).transition().duration(750);

    function zoomed(event) {
      const xz = event.transform.rescaleX(x);
      linepath.attr("d", line(price, xz));
      avpath.attr("d", avline(price, xz));
      tweetsdots(xz);
      brushg.on("brush end", brushed);
      gx.call(xAxis, xz);
    }

    // Add x and y scales and axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(price, (d) => new Date(d.Date)))
      .range([margin.left, width - margin.right]);

    const xAxis = (g, x) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    const gx = svg.append("g").call(xAxis, x);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(price, (d) => +d.Close)])
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g, y) =>
      g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append("g").call(yAxis, y);

    // Add the brushing
    const brush = d3
      .brushX()
      .extent([
        [margin.left, -margin.top],
        [width, height - margin.bottom],
      ])
      .on("brush end", brushed);
    const brushg = svg.append("g").attr("class", "brush").call(brush);

    function brushed(event) {
      const selection = event.selection;

      let xDateMin = x.invert(selection[0]);
      let xDateMax = x.invert(selection[1]);
      tweetsSvg.selectAll(".tweet-box").remove();
      tweets
        .filter((tweet) => {
          const tweetDate = new Date(tweet.created_at);
          const hoverDateMin = new Date(xDateMin);
          const hoverDateMax = new Date(xDateMax);

          return (
            tweetDate.getTime() >= hoverDateMin.getTime() &&
            tweetDate.getTime() <= hoverDateMax.getTime()
          );
        })
        .forEach((tweet, index) => {
          addTweetBox(tweet, tweetsSvg);
        });
    }

    // Plotting the price-line
    const line = (data, x) =>
      d3
        .line()
        .x((d) => x(new Date(d.Date)))
        .y((d) => y(+d.Close))(data);

    const linepath = svg
      .append("path")
      .attr("clip-path", clip)
      .datum(price)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("pointer-events", "none")
      .attr("d", (data) => line(data, x));

    // Plotting the running average-line
    const avline = (data, x) =>
      d3
        .line()
        .x((d) => x(new Date(d.Date)))
        .y((d) => {
          try {
            return y(d.rollingaverage);
          } catch (e) {
            return y(0);
          }
        })(data);

    const avpath = svg
      .append("path")
      .datum(price)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("pointer-events", "none")
      .attr("d", (data) => avline(data, x));

    // Animate in the line
    // const lineLength = path.node().getTotalLength();
    // path
    //   .attr("stroke-dasharray", lineLength + " " + lineLength)
    //   .attr("stroke-dashoffset", lineLength)
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .attr("stroke-dashoffset", 0)
    //   .duration(6000);

    // Plotting the relevant tweets
    const tweetsdots = (x) => {
      svg.selectAll("circle").remove();
      svg
        .selectAll("circle")
        .data(tweets)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(new Date(d.created_at)))
        .attr("cy", (d) => {
          const bisect = d3.bisector((d) => new Date(d.Date)).right;
          const i = bisect(price, new Date(d.created_at));
          return y(+price?.[i]?.Close);
        })
        .attr("r", 3)
        .style("fill", "red")
        .style("cursor", "pointer")
        // these have to be functions to use the this keyword
        .on("mouseover", function () {
          d3.select(this).transition().duration("100").attr("r", 6);
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration("100").attr("r", 3);
        })
        .on("click", (event, tweet) => {
          tweetsSvg.selectAll(".tweet-box").remove();
          addTweetBox(tweet, tweetsSvg);
        });
    };

    tweetsdots(x);
  }, [graphRef, containerRef, tweetsRef, asset]);

  return (
    <article ref={containerRef} className={css.container}>
      <section className={css.graph}>
        <svg height="100%" width="100%" ref={graphRef} />
      </section>
      <section className={css.tweets} ref={tweetsRef} />
    </article>
  );
};

export default MainChart;

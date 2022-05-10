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

  const n = 50;
  for (let i = 0; i < price.length; i++) {
    price[i].rollingaverage =
      price.slice(i - n, i).reduce((sum, d) => sum + +d.Close, 0) / n;
  }

  useEffect(() => {
    if (!graphRef.current || !tweetsRef.current || !containerRef.current)
      return;

    const width =
      containerRef.current.getBoundingClientRect().width -
      margin.left -
      margin.right -
      468;
    const height = 400 - margin.top - margin.bottom;

    d3.selectAll(".main-chart-group").remove();

    const svg = d3
      .select(graphRef.current)
      .append("g")
      .attr("class", "main-chart-group")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const tweetsSvg = d3.select(tweetsRef.current);

    const x = d3
      .scaleTime()
      .domain(d3.extent(price, (d) => new Date(d.Date)))
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(price, (d) => +d.Close)])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    const brushed = (event) => {
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
    };

    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("brush end", brushed);

    svg.append("g").attr("class", "brush").call(brush);

    // Plotting the price-line
    const line = svg
      .append("path")
      .datum(price)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("pointer-events", "none")
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(new Date(d.Date)))
          .y((d) => y(+d.Close))
      );

    // // Plotting the running average-line
    const averageline = svg
      .append("path")
      .datum(price)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("pointer-events", "none")
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(new Date(d.Date)))
          .y((d) => {
            try {
              return y(d.rollingaverage);
            } catch (e) {
              return y(0);
            }
          })
      );

    // Animate in the line
    const lineLength = line.node().getTotalLength();
    line
      .attr("stroke-dasharray", lineLength + " " + lineLength)
      .attr("stroke-dashoffset", lineLength)
      .transition()
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .duration(6000);

    // Plotting the relevant tweets
    svg
      .append("g")
      .selectAll("dot")
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

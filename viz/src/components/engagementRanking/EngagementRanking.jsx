import React, { useEffect, useRef, useState } from "react";
import css from "./EngagementRanking.module.css";
import * as d3 from "d3";
import { addTweetBox } from "../../utils/addTweet";
import { useNavigate } from "react-router-dom";

const EngagementRanking = ({ tweets }) => {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const rankingRef = useRef(null);
  const tweetsRef = useRef(null);
  const containerRef = useRef(null);
  const naviagte = useNavigate();

  // const order = (a, b) => d3.descending(Number(a.nlikes), Number(b.nlikes));
  // const sortedTweets = [...tweets].sort(order).slice(0, 10);

  useEffect(() => {
    if (!rankingRef.current) return;
    d3.selectAll(".ranking-chart-group").remove();
    const width = rankingRef.current.getBoundingClientRect().width;
    margin.left - margin.right;
    const height = rankingRef.current.getBoundingClientRect().height;
    -margin.top - margin.bottom;

    const svg = d3
      .select(rankingRef.current)
      .append("g")
      .attr("class", "ranking-chart-group");

    // Add x and y scales and axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(tweets, (d) => new Date(d.created_at)))
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
      .domain([0, d3.max(tweets, (d) => +d.nlikes)])
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g, y) =>
      g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append("g").call(yAxis, y);

    // Add the brushing
    const brush = (x) =>
      d3
        .brushY()
        .extent([
          [margin.left, margin.top],
          [width - margin.right, height - margin.bottom],
        ])
        .on("start brush end", brushed);

    svg.append("g").attr("class", "brush").call(brush(x));

    const tweetsSvg = d3.select(tweetsRef.current);
    tweetsSvg.selectChildren().remove();

    // Plotting the relevant tweets
    const tweetsdots = (x) => {
      svg.selectAll("circle").remove();
      svg
        .selectAll("circle")
        .data(tweets)
        .enter()
        .append("circle")
        // .attr("clip-path", clip)
        .attr("cx", (d) => x(new Date(d.created_at)))
        .attr("cy", (d) => y(d.nlikes))
        .attr("class", "tweetcircle")
        .attr("id", (d) => "tweetid" + d.id)
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
          addTweetBox(tweet, tweetsSvg, history);
        });
    };

    tweetsdots(x);

    function brushed(event) {
      const selection = event.selection;

      const hoverMetricMin = y.invert(selection[1]);
      const hoverMetricMax = y.invert(selection[0]);

      const data = tweets.filter((tweet) => {
        const tweetMetric = Number(tweet.nlikes);

        return tweetMetric >= hoverMetricMin && tweetMetric <= hoverMetricMax;
      });

      const tweetBoxes = tweetsSvg.selectAll(".tweet-box").data(data);

      tweetBoxes.enter().each((tweet) => {
        addTweetBox(tweet, tweetsSvg, naviagte);
      });

      tweetBoxes.exit().call((x) => {
        x.remove();
      });
    }
  }, [tweets]);

  return (
    <article ref={containerRef} className={css.container}>
      <section className={css.ranking}>
        <svg height="100%" width="100%" ref={rankingRef} />
      </section>
      <section id="disable" className={css.tweets} ref={tweetsRef} />
    </article>
  );
};

export default EngagementRanking;

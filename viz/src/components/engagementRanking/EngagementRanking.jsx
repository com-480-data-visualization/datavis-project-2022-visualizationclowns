import React, { useEffect, useRef, useState } from "react";
import css from "./EngagementRanking.module.css";
import * as d3 from "d3";
import { addTweetBox } from "../../utils/addTweet";
import { useNavigate } from "react-router-dom";

const EngagementRanking = ({ tweets }) => {
  const margin = { top: 10, right: 30, bottom: 60, left: 100 };
  const rankingRef = useRef(null);
  const tweetsRef = useRef(null);
  const containerRef = useRef(null);
  const naviagte = useNavigate();

  const metrics = [
    { metric: "nlikes", name: "Likes" },
    { metric: "nretweets", name: "Retweets" },
    { metric: "nreplies", name: "Replies" },
  ];

  const [selectedMetric, setSelectedMetric] = useState("nlikes");

  // const order = (a, b) => d3.descending(Number(a.nlikes), Number(b.nlikes));
  // const sortedTweets = [...tweets].sort(order).slice(0, 10);

  useEffect(() => {
    if (!rankingRef.current) return;
    const svg = d3.select(rankingRef.current);
    svg.selectAll(".tweetcircle").remove();
  }, [tweets]);

  useEffect(() => {
    if (!rankingRef.current) return;
    const width = rankingRef.current.getBoundingClientRect().width;
    margin.left - margin.right;
    const height = rankingRef.current.getBoundingClientRect().height;
    -margin.top - margin.bottom;

    const svg = d3.select(rankingRef.current);

    if (!svg.selectAll(".ranking-chart-group").size())
      svg.append("g").attr("class", "ranking-chart-group");

    // Add x and y scales and axis
    const maxChange = d3.max(tweets, (d) => d.dayChange);
    const minChange = d3.min(tweets, (d) => d.dayChange);
    const maxExtent =
      Math.ceil(Math.max(Math.abs(maxChange), Math.abs(minChange)) * 10) / 10;
    const x = d3
      .scaleLinear()
      .domain([-maxExtent, maxExtent])
      .range([margin.left, width - margin.right]);

    const xAxis = (g, label) =>
      g
        .attr("class", "axis")
        .style("font-size", "14px")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
            .tickFormat(d3.format(".0%"))
        )
        .append("g")
        .attr("class", "axis-label")
        .append("text")
        .text(label)
        .attr("x", margin.left + (width - margin.left - margin.right) / 2)
        .attr("y", 40)
        .attr("fill", "currentColor");

    const y = d3
      .scaleLinear()
      .domain([1, d3.max(tweets, (d) => +d?.[selectedMetric])])
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g, label) => {
      g.attr("class", "axis")
        .style("font-size", "14px")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5))
        .append("g")
        .append("text")
        .attr("class", "axis-label")
        .text(label)
        .attr("transform", "rotate(-90)")
        .attr(
          "x",
          -(margin.top + (height - margin.top - margin.bottom) / 2) + 10
        )
        .attr("y", -80)
        .attr("fill", "currentColor");

      g.selectAll("g.tick text").attr("transform", "rotate(5)");
    };

    svg.selectAll(".axis").remove();
    svg.append("g").call(xAxis, "Day Change");
    svg.append("g").call(yAxis, "Tweets");

    // Add the brushing
    // console.log(svg.classed("brush"));
    const brushed = ({ selection: [[x0, y0], [x1, y1]] }) => {
      const ymin = y.invert(y1);
      const ymax = y.invert(y0);
      const xmax = x.invert(x1);
      const xmin = x.invert(x0);

      const data = tweets.filter((tweet) => {
        const tweetMetric = Number(tweet?.[selectedMetric]);
        const tweetChange = Number(tweet.dayChange);

        return (
          tweetMetric >= ymin &&
          tweetMetric <= ymax &&
          tweetChange >= xmin &&
          tweetChange <= xmax
        );
      });

      const tweetBoxes = tweetsSvg
        .selectAll(".tweet-box")
        .data(data, (d) => d?.id);

      tweetBoxes.enter().each((tweet) => {
        addTweetBox(tweet, tweetsSvg, naviagte);
      });

      tweetBoxes.exit().call((x) => {
        x.remove();
      });
    };

    svg.selectAll(".brush").remove();
    if (!svg.selectAll(".brush").size()) {
      svg
        .insert("g", ".tweetcircle")
        .attr("class", "brush")
        .call(
          d3
            .brush()
            .extent([
              [margin.left, 0],
              [width - margin.right, height - margin.bottom],
            ])
            .on("start end", brushed)
        );
    }

    const tweetsSvg = d3.select(tweetsRef.current);

    // Plotting the relevant tweets
    svg
      .selectAll("circle")
      .data(tweets, (d) => d?.id)
      .enter()
      .append("circle")
      .attr("class", "tweetcircle")
      .attr("id", (d) => "tweetid" + d.id)
      .attr("r", 5)
      .style("fill", "black")
      .style("opacity", 0)
      .style("cursor", "pointer")
      // these have to be functions to use the this keyword
      .on("mouseover", () =>
        d3.select(this).transition().duration("100").attr("r", 9)
      )
      .on("mouseout", () =>
        d3.select(this).transition().duration("100").attr("r", 5)
      )
      .on("click", (event, tweet) => {
        tweetsSvg.selectAll(".tweet-box").remove();
        addTweetBox(tweet, tweetsSvg, history);
        d3.select(".scroll-text").style("display", "none");
      });

    svg
      .selectAll("circle")
      .attr("cx", (d) => x(d.dayChange))
      .transition()
      .duration(2000)
      .attr("cy", (d) => y(d?.[selectedMetric]))
      .style("opacity", 0.6);
  }, [tweets, selectedMetric]);

  useEffect(() => {
    if (!rankingRef.current) return;
    const svg = d3.select(rankingRef.current);

    const width = rankingRef.current.getBoundingClientRect().width;
    margin.left - margin.right;
    const height = rankingRef.current.getBoundingClientRect().height;
    -margin.top - margin.bottom;

    const maxChange = d3.max(tweets, (d) => d.dayChange);
    const minChange = d3.min(tweets, (d) => d.dayChange);
    const maxExtent =
      Math.ceil(Math.max(Math.abs(maxChange), Math.abs(minChange)) * 10) / 10;
    const x = d3
      .scaleLinear()
      .domain([-maxExtent, maxExtent])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([1, d3.max(tweets, (d) => +d?.[selectedMetric])])
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("circle").data(tweets, (d) => d?.id);

    svg
      .selectAll("circle")
      .attr("cx", (d) => x(d.dayChange))
      .transition()
      .duration(2000)
      .attr("cy", (d) => y(d?.[selectedMetric]))
      .style("opacity", 0.6);
  }, [selectedMetric]);

  return (
    <article ref={containerRef} className={css.container}>
      <section className={css.ranking}>
        <section className={css.metricButtonsContainer}>
          {metrics.map((metric) => (
            <div
              className={[
                css.metricButton,
                metric.metric == selectedMetric && css.selectedMetric,
              ].join(" ")}
              onClick={() => setSelectedMetric(metric.metric)}
              key={metric.metric}
            >
              {metric.name}
            </div>
          ))}
        </section>
        <svg height="100%" width="100%" ref={rankingRef} />
      </section>
      <section id="disable" className={css.tweets} ref={tweetsRef} />
    </article>
  );
};

export default EngagementRanking;

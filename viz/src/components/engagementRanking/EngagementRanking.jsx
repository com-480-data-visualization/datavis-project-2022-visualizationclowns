import React, { useEffect, useRef, useState } from "react";
import css from "./EngagementRanking.module.css";
import * as d3 from "d3";
import { addTweetBox } from "../../utils/addTweet";
import { useNavigate } from "react-router-dom";
import debounce from "../../utils/debounce";

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
    const maxChange = d3.max(tweets, (d) => d.dayChange);
    const minChange = d3.min(tweets, (d) => d.dayChange);
    const maxExtent =
      Math.ceil(Math.max(Math.abs(maxChange), Math.abs(minChange)) * 10) / 10;
    const x = d3
      .scaleLinear()
      .domain([-maxExtent, maxExtent])
      .range([margin.left, width - margin.right]);

    const xAxis = (g) =>
      g
        .style("font-size", "14px")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
            .tickFormat(d3.format(".0%"))
        );

    const y = d3
      .scaleLinear()
      .domain([1, d3.max(tweets, (d) => +d.nlikes)])
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g) => {
      g.style("font-size", "14px")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5));

      g.selectAll("g.tick text").attr("transform", "rotate(5)");
    };

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Add the brushing
    svg
      .append("g")
      .attr("class", "brush")
      .call(
        d3
          .brush()
          .extent([
            [margin.left, 0],
            [width - margin.right, height - margin.bottom],
          ])
          .on("start brush", debounce(brushed, 50))
      );

    const tweetsSvg = d3.select(tweetsRef.current);
    tweetsSvg.selectChildren().remove();

    // Plotting the relevant tweets
    svg.selectAll("circle").remove();
    svg
      .selectAll("circle")
      .data(tweets)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.dayChange))
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
        d3.select(".scroll-text").style("display", "none");
      });

    function brushed({ selection: [[x0, y0], [x1, y1]] }) {
      const ymin = y.invert(y1);
      const ymax = y.invert(y0);
      const xmax = x.invert(x1);
      const xmin = x.invert(x0);

      const data = tweets.filter((tweet) => {
        const tweetMetric = Number(tweet.nlikes);
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
        .data(data, function (d) {
          return d?.id;
        });

      tweetBoxes.enter().each((tweet) => {
        addTweetBox(tweet, tweetsSvg, naviagte);
      });

      tweetBoxes.exit().call((x) => {
        x.remove();
      });
    }
  }, [tweets]);

  // const scrollRight = () => {
  //   if (!tweetsRef.current) return;

  //   let tweetNode = (d3.select(tweetsRef.current).node().scrollLeft += 500);
  // };

  return (
    <article ref={containerRef} className={css.container}>
      <section className={css.ranking}>
        <svg height="100%" width="100%" ref={rankingRef} />
      </section>
      <section id="disable" className={css.tweets} ref={tweetsRef} />
      {/* <div
        style={{ userSelect: "none" }}
        onClick={(e) => {
          e.preventDefault();
          scrollRight();
        }}
        className={[css.scrollText, "scroll-text"].join(" ")}
      >
        Scroll right
      </div> */}
    </article>
  );
};

export default EngagementRanking;

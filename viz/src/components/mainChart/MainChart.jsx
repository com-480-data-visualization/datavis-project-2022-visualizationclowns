import React, { useEffect, useRef } from "react";
import css from "./MainChart.module.css";
import * as d3 from "d3";
import { addTweetBox } from "../../utils/addTweet";
import { useNavigate } from "react-router-dom";
import uid from "../../utils/uid";

const MainChart = ({ asset, tweets }) => {
  let price = asset.slice(-1000); //TODO filter based on time?
  const margin = { top: 10, right: 30, bottom: 50, left: 100 };
  const naviagte = useNavigate();

  const graphRef = useRef(null);
  const tweetsRef = useRef(null);
  const containerRef = useRef(null);

  // Add rolling average to data
  const n = 50;
  for (let i = 0; i < price.length; i++) {
    price[i].rollingaverage =
      price.slice(i - n, i).reduce((sum, d) => sum + +d.Close, 0) / n;
  }

  for (let i = 0; i < price.length; i++) {
    price[i].rollingaverage =
      i + n >= price.length ? null : price[i + n].rollingaverage;
  }

  price[0].color = "green";
  for (let i = 1; i < price.length; i++) {
    price[i].color =
      price[i].rollingaverage > price[i - 1].rollingaverage ? "green" : "red";
  }

  useEffect(() => {
    if (!graphRef.current || !tweetsRef.current || !containerRef.current)
      return;

    // Get width and height of containers
    const width = graphRef.current.getBoundingClientRect().width;
    margin.left - margin.right;
    const height = graphRef.current.getBoundingClientRect().height;
    -margin.top - margin.bottom;

    // Create the graph and tweet svgs
    d3.selectAll(".main-chart-group").remove();

    const svg = d3
      .select(graphRef.current)
      .append("g")
      .attr("class", "main-chart-group");

    const tweetsSvg = d3.select(tweetsRef.current);
    tweetsSvg.selectChildren().remove();

    // Add cliping for clipping lines correclty during zooming
    const clip = uid("clip");

    svg
      .append("clipPath")
      .attr("id", clip.id)
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
      linepath.attr("d", line(xz));
      grad.attr("offset", (d) => xz(new Date(d.Date)) / width);
      avpath.attr("d", avline(price, xz)).attr("stroke", gradient);
      tweetsdots(xz);
      brushg.attr("class", "brush").call(d3.brush().clear).call(brush(xz));
      gx.call(xAxis, xz);
    }

    // Add x and y scales and axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(price, (d) => new Date(d.Date)))
      .range([margin.left, width - margin.right]);

    const xAxis = (g, x, label) =>
      g
        .style("font-size", "18px")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 170)
            .tickSizeOuter(0)
        )
        .append("g")
        .attr("class", "axis-label")
        .append("text")
        .text(label)
        .attr("x", margin.left + (width - margin.left - margin.right) / 2)
        .attr("y", 50)
        .attr("fill", "currentColor");

    const gx = svg.append("g").call(xAxis, x, "Date");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(price, (d) => +d.Close)])
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g, y, label) => {
      g.attr("transform", `translate(${margin.left},0)`)
        .style("font-size", "18px")
        .call(d3.axisLeft(y).ticks(5).tickSize(2))
        .append("text")
        .attr("class", "axis-label")
        .text(label)
        .attr("transform", "rotate(-90)")
        .attr(
          "x",
          -(margin.top + (height - margin.top - margin.bottom) / 2) + 50
        )
        .attr("y", -80)
        .attr("fill", "currentColor");

      g.selectAll("g.tick text").attr("transform", "rotate(5)");
    };

    svg.append("g").call(yAxis, y, "Price (in USD)");

    // Add the brushing
    const brush = (x) =>
      d3
        .brushX()
        .extent([
          [margin.left, margin.top],
          [width - margin.right, height - margin.bottom],
        ])
        .on("start end", brushed(x));

    const brushg = svg.append("g").attr("class", "brush").call(brush(x));

    function brushed(xb) {
      return (event) => {
        const selection = event.selection;

        let xDateMin = xb.invert(selection[0]);
        let xDateMax = xb.invert(selection[1]);
        const data = tweets.filter((tweet) => {
          const tweetDate = new Date(tweet.created_at);
          const hoverDateMin = new Date(xDateMin);
          const hoverDateMax = new Date(xDateMax);

          return (
            tweetDate.getTime() >= hoverDateMin.getTime() &&
            tweetDate.getTime() <= hoverDateMax.getTime()
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
      };
    }

    // Plotting the price-line
    const line = (x) =>
      d3
        .line()
        .x((d) => x(new Date(d.Date)))
        .y((d) => y(+d.Close));

    const linepath = svg
      .append("path")
      .attr("clip-path", clip)
      .datum(price)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("pointer-events", "none")
      .attr("d", line(x));

    // Making the gradient for the average line
    const gradient = uid("gradient");
    const grad = svg
      .append("linearGradient")
      .attr("id", gradient.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", width)
      .selectAll("stop")
      .data(price)
      .join("stop")
      .attr("offset", (d) => x(new Date(d.Date)) / width)
      .attr("stop-color", (d) => d.color);

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
        })(data.slice(0, -n));

    const avpath = svg
      .append("path")
      .attr("clip-path", clip)
      .datum(price)
      .attr("fill", "none")
      .attr("stroke", gradient)
      .attr("stroke-width", 2)
      .attr("pointer-events", "none")
      .attr("d", (data) => avline(data, x));

    // Plotting the relevant tweets
    const tweetsdots = (x) => {
      svg.selectAll("circle").remove();
      svg
        .selectAll("circle")
        .data(tweets)
        .enter()
        .append("circle")
        .attr("clip-path", clip)

        .attr("cx", (d) => x(new Date(d.created_at)))
        .attr("cy", (d) => {
          const bisect = d3.bisector((d) => new Date(d.Date)).right;
          const i = bisect(price, new Date(d.created_at));
          return y(+price?.[i]?.Close);
        })
        .attr("class", "tweetcircle")
        .attr("id", (d) => "tweetid" + d.id)
        .attr("r", 5)
        .style("fill", "black")
        .style("opacity", 0.6)
        .style("cursor", "pointer")
        // these have to be functions to use the this keyword
        .on("mouseover", function () {
          d3.select(this).transition().duration("100").attr("r", 9);
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration("100").attr("r", 5);
        })
        .on("click", (event, tweet) => {
          tweetsSvg.selectAll(".tweet-box").remove();
          addTweetBox(tweet, tweetsSvg, history);
        });
    };

    tweetsdots(x);
  }, [graphRef, containerRef, tweetsRef, asset]);

  return (
    <article ref={containerRef} className={css.container}>
      <section className={css.legend}>
        <section>
          <div className={css.assetLegend} />
          <div>Asset price</div>
        </section>
        <section>
          <div
            className={css.rollingavgLegend}
            style={{ backgroundColor: "red" }}
          />
          <div
            className={css.rollingavgLegend}
            style={{ backgroundColor: "green" }}
          />
          <div>{n} day rolling average</div>
        </section>
        <section>
          <div className={css.tweetBallLegend} />
          <div>Tweet</div>
        </section>
      </section>
      <section className={css.graph}>
        <svg height="100%" width="100%" ref={graphRef} />
      </section>
      <section id="disable" className={css.tweets} ref={tweetsRef} />
    </article>
  );
};

export default MainChart;

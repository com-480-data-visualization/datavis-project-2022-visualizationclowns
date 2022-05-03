import "./style.css";
import * as d3 from "https://unpkg.com/d3?module";
import { addTweetBox } from "./tweet";

export const generateTweetsVsPrice = (tweets, crypto) => {
  tweets = tweets.filter((tweet) =>
    tweet.tweet.match(new RegExp(`.*([b,B]itcoin|BTC).*`))
  );

  crypto = crypto.slice(1000);

  let margin = { top: 10, right: 30, bottom: 30, left: 60 };
  let width =
    document.body.getBoundingClientRect().width -
    margin.left -
    margin.right -
    468;
  let height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(".main-chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const tweetsSvg = d3.select(".tweets");

  const x = d3
    .scaleTime()
    .domain(d3.extent(crypto, (d) => new Date(d.Date)))
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(crypto, (d) => +d.Close)])
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

  var brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, height],
    ])
    .on("brush end", brushed);

  svg.append("g").attr("class", "brush").call(brush);

  svg
    .append("path")
    .datum(crypto)
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
      const i = bisect(crypto, new Date(d.created_at));
      return y(+crypto[i].Close);
    })
    .attr("r", 3)
    .style("fill", "red")
    .style("cursor", "pointer")
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

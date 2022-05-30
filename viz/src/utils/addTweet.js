import * as d3 from "d3";
import "./twitter.css";

export const addTweetBox = (tweet, container, location) => {
  const date = new Date(tweet.created_at);

  const f = d3.format("3.2~s");

  const box = container
    .append("div")
    .attr("id", "id" + tweet.id)
    .attr("class", "tweet-box");

  box.on("click", () => {
    d3.selectAll(".tweetcircle").attr("r", 5);
    d3.select("#tweetid" + tweet.id).attr("r", 9);
  });

  const header = box.append("div").attr("class", "tweet-box-header");

  header
    .append("img")
    .attr("src", "/musk_100x100.jpg")
    .attr("alt", "Elon Musk")
    .attr("class", "tweet-img");

  const name = header.append("div").attr("class", "tweet-header-name");

  header.append("div").text(d3.format(".2%")(tweet.dayChange));

  const statArrow = header
    .append("svg")
    .style("margin-left", "6px")
    .attr("height", "24px")
    .attr("width", "18px")
    .attr("viewBox", "0 0 24 24")
    .append("path");

  if (tweet.dayChange < 0) {
    statArrow
      .attr(
        "d",
        "M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
      )
      .attr("fill", "red");
  } else {
    statArrow
      .attr(
        "d",
        "M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
      )
      .attr("fill", "green");
  }

  const priceChangeText = header
    .append("div")
    .style("font-weight", "lighter")
    .style("position", "relative")
    .style("left", "-6px")
    .style("cursor", "default")
    .text("Asset price change")
    .on("mouseover", function () {
      d3.select(this).selectChildren(".tooltip").style("opacity", 1);
    })
    .on("mouseout", function () {
      d3.select(this).selectChildren(".tooltip").style("opacity", 0);
    });

  priceChangeText
    .append("div")
    .attr("class", "tooltip")
    .style("transition", "opacity 0.2s ease-in-out")
    .style("opacity", 0)
    .style("pointer-events", "none")
    .style("width", "170px")
    .style("height", "75px")
    .style("padding", "16px")
    .style("border-radius", "4px")
    .style("position", "absolute")
    .style("background", "white")
    .style("top", "25px")
    .style("left", "-50px")
    .style("z-index", "11")
    .style("box-shadow", "5px 5px 22px -3px rgba(0,0,0,0.27)")
    .text("Price change in selected asset 48 hours after day of tweet.");

  name
    .append("div")
    .attr("class", "tweet-name")
    .text("Elon Musk")
    .append("div")
    .attr("class", "tweet-handle")
    .text("@elonmusk");

  name
    .append("img")
    .attr("src", "/twitter_verified_badge.svg")
    .attr("height", "16.5px");

  box.append("div").attr("class", "tweet-text").html(tweet.tweet);

  box
    .append("div")
    .attr("class", "tweet-date")
    .text(d3.timeFormat("%-I:%M %p · %b %-d, %Y · Twitter for iPhone")(date));

  const metrics = box.append("div").attr("class", "tweet-metrics");

  metrics
    .append("div")
    .text(f(tweet.nretweets))
    .append("span")
    .text("Retweets");
  metrics
    .append("div")
    .text(f(tweet.nreplies))
    .append("span")
    .text("Quote Tweets");
  metrics.append("div").text(f(tweet.nlikes)).append("span").text("Likes");

  metrics
    .append("div")
    .append("a")
    .text("Link")
    .attr("href", `https://twitter.com/elonmusk/status/${tweet.id}`)
    .attr("target", "_blank");
};

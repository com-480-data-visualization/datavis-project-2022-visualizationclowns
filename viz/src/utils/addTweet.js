import * as d3 from "https://unpkg.com/d3?module";
import "./twitter.css";

// TODO: add twitter logo, nlikes, nretweets, nreplies.

export const addTweetBox = (tweet, container) => {
  const date = new Date(tweet.created_at);

  const f = d3.format("3.2~s");

  const box = container.append("div").attr("class", "tweet-box");

  const header = box.append("div").attr("class", "tweet-box-header");

  header
    .append("img")
    .attr("src", "/musk_100x100.jpg")
    .attr("alt", "Elon Musk")
    .attr("class", "tweet-img");

  const name = header.append("div").attr("class", "tweet-header-name");

  header.append("div").text(tweet.dayChange);

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

  box.append("div").attr("class", "tweet-text").text(tweet.tweet);

  box
    .append("div")
    .attr("class", "tweet-date")
    .text(d3.timeFormat("%-I:%M %p · %b %-d, %Y · Twitter for iPhone")(date));

  box
    .append("div")
    .attr("class", "tweet-metrics")
    .html(
      ` <strong>${f(tweet.nretweets)}</strong> Retweets <strong>${f(
        tweet.nreplies
      )}</strong> Quote tweets <strong>${f(tweet.nlikes)}</strong> 
       Likes`
    );
};

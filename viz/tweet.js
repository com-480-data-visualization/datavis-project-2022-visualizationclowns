import * as d3 from "https://unpkg.com/d3?module";
import "./style.css";

// Inspired by this https://github.com/com-480-data-visualization/data-visualization-project-2021-jin-juice/blob/master/website/src/race/Tweet.js
// TODO: add verified icon and twitter logo and move name to correct spot.

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const addTweetBox = (tweet, svg) => {
    const date = new Date(tweet.created_at);

    const box = svg
        .append("div")
        .attr("class", "tweet-box");
    
    box
        .append("img")
        .attr("src", "https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg")
        .attr("alt", "Elon Musk")
        .attr("class", "tweet-img")

    box
        .append("div")
        .attr("class", "tweet-name")
        .text("Elon Musk")
        .append("div")
        .attr("class", "tweet-handle")
        .text("@elonmusk");

    box
        .append("div")
        .attr("class", "tweet-text")
        .text(tweet.tweet);

    box
        .append("div")
        .attr("class", "tweet-date")
        .text(d3.timeFormat("%-I:%M %p · %b %-d, %Y · Twitter for iPhone")(date));
};
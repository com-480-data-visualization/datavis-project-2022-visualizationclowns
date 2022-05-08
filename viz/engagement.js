import "/style.css";
import * as d3 from "https://unpkg.com/d3?module";
import { addChart } from "./chart";

(async () => {
  let tweets = await d3.csv("/alltweets.csv");

  const filtered_tweets = {
    bitcoin: tweets
        .filter((tweet) =>
        tweet.tweet.toLowerCase().match(new RegExp(`.*(bitcoin|btc).*`))
      ),
    tesla: tweets
      .filter((tweet) =>
        tweet.tweet.toLowerCase().match(new RegExp(`.*(tsla|tesla stock).*`))
      ),
    dogecoin: tweets
      .filter((tweet) =>
        tweet.tweet.toLowerCase().match(new RegExp(`.*(doge).*`))
      )
  };

  const radioSelect = d3.selectAll(".radio");
  const svg =  d3.select(".engagement-comparison")
  .attr("width", "500")
  .attr("height", "400")

  radioSelect.on("change", (e) => {

    if (e.target.value == "likes") {
      d3.selectAll("svg > *").remove();

      var yValues = []

      for (const [key, value] of Object.entries(filtered_tweets)) {
        var totalLikes = 0
        filtered_tweets[key].forEach((tweet) => {
          totalLikes = Number(totalLikes) + Number(tweet.nlikes) 
        });
        yValues.push(totalLikes/filtered_tweets[key].length)
      }
      addChart(yValues, svg)

    } else if (e.target.value == "retweets") {

      d3.selectAll("svg > *").remove();

      var yValues = []

      for (const [key, value] of Object.entries(filtered_tweets)) {
        var totalRetweets = 0
        filtered_tweets[key].forEach((tweet) => {
          totalRetweets = Number(totalRetweets) + Number(tweet.nretweets) 
        });
        yValues.push(totalRetweets/filtered_tweets[key].length)
      }
      addChart(yValues, svg)

    } else if (e.target.value == "replies") {

      d3.selectAll("svg > *").remove();

      var yValues = []

      for (const [key, value] of Object.entries(filtered_tweets)) {
        var totalReplies = 0
        filtered_tweets[key].forEach((tweet) => {
          totalReplies = Number(totalReplies) + Number(tweet.nreplies) 
        });
        yValues.push(totalReplies/filtered_tweets[key].length)
      }
      addChart(yValues, svg)
    }
  });
})();


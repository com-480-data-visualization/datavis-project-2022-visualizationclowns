import "/style.css";
import * as d3 from "https://unpkg.com/d3?module";
import { addTweetBox } from "./tweet";

(async () => {
  let tweets = await d3.csv("/alltweets.csv");

  const filtered_tweets = {
    bitcoin: tweets
      .filter((tweet) =>
        tweet.tweet.toLowerCase().match(new RegExp(`.*(bitcoin|btc).*`))
      )
      .sort(function (a, b) {
        return d3.descending(a.nlikes, b.nlikes);
      }),
    dogecoin: tweets
      .filter((tweet) =>
        tweet.tweet.toLowerCase().match(new RegExp(`.*(doge).*`))
      )
      .sort(function (a, b) {
        return d3.descending(a.nlikes, b.nlikes);
      }),
    tesla: tweets
      .filter((tweet) =>
        tweet.tweet.toLowerCase().match(new RegExp(`.*(tsla|tesla stock).*`))
      )
      .sort(function (a, b) {
        return d3.descending(a.nlikes, b.nlikes);
      }),
  };

  const tweetsSvg = d3.select(".tweets");

  const radioSelect = d3.selectAll(".radio");
  radioSelect.on("change", (e) => {
    tweetsSvg.selectAll(".tweet-box").remove();
    filtered_tweets[e.target.value].forEach((tweet, index) => {
      if (index < 10) {
        addTweetBox(tweet, tweetsSvg);
      }
    });
  });

  tweetsSvg.selectAll(".tweet-box").remove();
  filtered_tweets["bitcoin"].forEach((tweet, index) => {
    if (index < 10) {
      addTweetBox(tweet, tweetsSvg);
    }
  });
})();

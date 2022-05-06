import "/style.css";
import * as d3 from "https://unpkg.com/d3?module";
import { addTweetBox } from "./tweet";

(async () => {
  let tweets = await d3.csv("/alltweets.csv");

  const filter_regex = (regex) => {
    return (tweet) => {
      return tweet.tweet.toLowerCase().match(new RegExp(`.*(bitcoin|btc).*`));
    };
  };
  const order = (a, b) => d3.descending(a.nlikes, b.nlikes);

  const filtered_tweets = {
    bitcoin: tweets.filter(filter_regex(`.*(bitcoin|btc).*`)).sort(order),
    dogecoin: tweets.filter(filter_regex(`.*(doge).*`)).sort(order),
    tesla: tweets.filter(filter_regex(`.*(doge).*`)).sort(order),
  };

  const tweetsSvg = d3.select(".tweets-ranking");
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

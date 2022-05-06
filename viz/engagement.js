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

  const radioSelect = d3.selectAll(".radio");

  var avgBitcoinLikes = 0
  var avgTeslaLikes = 0
  var avgDogeCoinLikes = 0


  radioSelect.on("change", (e) => {

    // svg.selectAll(".engagement-comparison").remove();

    if (e.target.value == "likes") {


      var totalBitcoinLikes = 0
      let totalBitcoinTweets =  filtered_tweets["bitcoin"].length
      filtered_tweets["bitcoin"].forEach((tweet, index) => {
        totalBitcoinLikes = Number(totalBitcoinLikes) + Number(tweet.nlikes) 
      });

      avgBitcoinLikes = totalBitcoinLikes/totalBitcoinTweets
      console.log(avgBitcoinLikes)

      var totalTeslaLikes = 0
      let totalTeslaTweets =  filtered_tweets["tesla"].length
      filtered_tweets["tesla"].forEach((tweet, index) => {
        totalTeslaLikes = Number(totalTeslaLikes) + Number(tweet.nlikes) 
      });

      avgTeslaLikes = totalTeslaLikes/totalTeslaTweets
      console.log(avgTeslaLikes)

      var totalDogeCoinLikes = 0
      let totalDogeCoinTweets =  filtered_tweets["dogecoin"].length
      filtered_tweets["dogecoin"].forEach((tweet, index) => {
        totalDogeCoinLikes = Number(totalDogeCoinLikes) + Number(tweet.nlikes) 
      });

      avgDogeCoinLikes = totalDogeCoinLikes/totalDogeCoinTweets
      console.log(avgDogeCoinLikes)

      let margin = { top: 10, right: 30, bottom: 30, left: 60 };
      let height = 400 - margin.top-margin.bottom
      let width  = document.body.getBoundingClientRect().width - margin.left - margin.right
    
      const svg =  d3.select(".engagement-comparison")
          .attr("width", "500")
          .attr("height", "400")
              
      let xValues = ["bitcoin", "tesla", "dogecoin"]
      let yValues = [avgBitcoinLikes, avgTeslaLikes, avgDogeCoinLikes]

      const xScale = d3.scaleBand().range([0, width]).padding(0.5).domain(xValues);
      const yScale = d3.scaleLinear().domain([0, d3.max(yValues)]).range([height, 0]);
    
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat((d) => d)
      );
    
     svg.append("g").attr("transform", "translate(0,0)").call(d3.axisLeft(yScale)); 
    
    
            // svg.selectAll(".bar")
            //  .data(xValues)
            //  .enter().append("rect")
    
           const I = [0,1,2]
    
             svg.selectAll(".bar")
             .data(I)
             .enter().append("rect")
             .attr("class", "bar")
             .attr("x", function(i) { 
               console.log(xScale(xValues[i]));
              return xScale(xValues[i]); 
          })
             .attr("y", function(i) { return yScale(yValues[i]); })
             .attr("width", xScale.bandwidth())
             .attr("height", function(i) { return height - yScale(yValues[i]); });

    } else if (e.target.value == "retweets") {


      // svg.selectAll(".engagement-comparison").remove();

      var avgBitcoinRetweets = 0
      var avgTeslaRetweets = 0
      var avgDogeCoinRetweets = 0

      var totalBitcoinRetweets = 0
      let totalBitcoinTweets =  filtered_tweets["bitcoin"].length
      filtered_tweets["bitcoin"].forEach((tweet, index) => {
        totalBitcoinRetweets = Number(totalBitcoinRetweets) + Number(tweet.nlikes) 
      });

      avgBitcoinRetweets = totalBitcoinRetweets/totalBitcoinTweets

      var totalTeslaRetweets = 0
      let totalTeslaTweets =  filtered_tweets["tesla"].length
      filtered_tweets["tesla"].forEach((tweet, index) => {
        totalTeslaRetweets = Number(totalTeslaRetweets) + Number(tweet.nlikes) 
      });

      avgTeslaRetweets = totalTeslaRetweets/totalTeslaTweets

      var totalDogeCoinRetweets = 0
      let totalDogeCoinTweets =  filtered_tweets["dogecoin"].length
      filtered_tweets["dogecoin"].forEach((tweet, index) => {
        totalDogeCoinRetweets = Number(totalDogeCoinRetweets) + Number(tweet.nlikes) 
      });

      avgDogeCoinRetweets = totalDogeCoinRetweets/totalDogeCoinTweets

      let margin = { top: 10, right: 30, bottom: 30, left: 60 };
      let height = 400 - margin.top-margin.bottom
      let width  = document.body.getBoundingClientRect().width - margin.left - margin.right
    
      const svg =  d3.select(".engagement-comparison")
          .attr("width", "500")
          .attr("height", "400")
              
      let xValues = ["bitcoin", "tesla", "dogecoin"]
      let yValues = [avgBitcoinRetweets, avgTeslaRetweets, avgDogeCoinRetweets]

      const xScale = d3.scaleBand().range([0, width]).padding(0.5).domain(xValues);
      const yScale = d3.scaleLinear().domain([0, d3.max(yValues)]).range([height, 0]);
    
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat((d) => d)
      );
    
     svg.append("g").attr("transform", "translate(0,0)").call(d3.axisLeft(yScale)); 
    
    
            // svg.selectAll(".bar")
            //  .data(xValues)
            //  .enter().append("rect")
    
           const I = [0,1,2]
    
             svg.selectAll(".bar")
             .data(I)
             .enter().append("rect")
             .attr("class", "bar")
             .attr("x", function(i) { 
               console.log(xScale(xValues[i]));
              return xScale(xValues[i]); 
          })
             .attr("y", function(i) { return yScale(yValues[i]); })
             .attr("width", xScale.bandwidth())
             .attr("height", function(i) { return height - yScale(yValues[i]); });
      

    } else if (e.target.value == "replies") {
      console.log("test ok");
    }
  });



})();

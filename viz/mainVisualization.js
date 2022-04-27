import "./style.css";
import * as d3 from d3;

export const generateTweetsVsPrice = (tweets, crypto) => {
  tweets = tweets.filter((tweet) =>
    tweet.tweet.match(new RegExp(`.*([b,B]itcoin|BTC).*`))
  );

  crypto = crypto.slice(1000);

  const mssecondsMonth = 2.628e9;

  const timeSpan =
    new Date(crypto.at(-1).Date).getTime() - new Date(crypto[0].Date).getTime();

  const months = timeSpan / mssecondsMonth;

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
    .domain(
      d3.extent(crypto, function (d) {
        return new Date(d.Date);
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(crypto, function (d) {
        return +d.Close;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  const mouseLine = svg.append("g").attr("class", "mouse-over-effects");

  mouseLine
    .append("path")
    .attr("class", "mouse-line")
    .style("stroke", "darkgrey")
    .style("stroke-width", width / months)
    .style("opacity", "0");

  mouseLine
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .attr("cursor", "none")
    .on("mouseover", function () {
      d3.select(".mouse-line").style("opacity", "1");
    })
    .on("mousemove", function (event) {
      const offset = mouseLine.node().getBoundingClientRect();

      const mouse = [event.layerX, event.layerY];

      let xDate = x.invert(mouse[0] - offset.x);
      tweetsSvg.selectAll(".tweet-box").remove();
      tweets
        .filter((tweet) => {
          const tweetDate = new Date(tweet.created_at);
          const hoverDate = new Date(xDate);

          return (
            tweetDate.getTime() >= hoverDate.getTime() &&
            tweetDate.getTime() < hoverDate.getTime() + mssecondsMonth
          );
        })
        .forEach((tweet, index) => {
          const tweetBox = tweetsSvg.append("div").attr("class", "tweet-box");

          tweetBox
            .append("div")
            .attr("class", "tweet-date")
            .text(tweet.created_at);
          tweetBox.append("div").attr("class", "tweet-class").text(tweet.tweet);
        });

      d3.select(".mouse-line").attr("d", function () {
        let d = "M" + (mouse[0] - offset.x) + "," + height;
        d += " " + (mouse[0] - offset.x) + "," + 0;
        return d;
      });
    });

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
        .x(function (d) {
          return x(new Date(d.Date));
        })
        .y(function (d) {
          return y(d.Close);
        })
    );
};

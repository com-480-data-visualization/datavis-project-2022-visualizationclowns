import React, { useEffect, useRef, useState } from "react";
import { addChart } from "./addChart";
import * as d3 from "d3";
import css from "./GroupedTweetHistogram.module.css";

import likes from "/like.svg";
import replies from "/reply.svg";
import retweets from "/retweet.svg";
import uparrpw from "/up_arrow.svg";

const GroupedTweetHistogram = ({ tweets }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const [bitcoinAvg, setBitcoinAvg] = useState(undefined);
  const [dogecoinAvg, setDogecoinAvg] = useState(undefined);
  const [teslaAvg, setTeslaAvg] = useState(undefined);

  const metrics = [
    { metric: "nlikes", name: "Likes", src: likes },
    { metric: "nretweets", name: "Retweets", src: retweets },
    { metric: "nreplies", name: "Replies", src: replies },
  ];

  const [selectedMetric, setMetric] = useState("nlikes");

  useEffect(() => {
    if (!containerRef.current || !svgRef) return;

    const svg = d3.select(svgRef.current);
    svg.selectChildren().remove();

    let yValues = [];

    for (const [key, value] of Object.entries(tweets)) {
      let totalLikes = 0;
      value.forEach((tweet) => {
        totalLikes += Number(tweet[selectedMetric]);
      });
      yValues.push(Math.round(totalLikes / tweets[key].length));
    }
    addChart(yValues, svg, containerRef.current);
  }, [tweets, selectedMetric]);

  useEffect(() => {
    setBitcoinAvg(
      tweets["Bitcoin"].reduce((acc, tweet) => acc + tweet.dayChange, 0) /
        tweets["Bitcoin"].length
    );
    setDogecoinAvg(
      tweets["Dogecoin"].reduce((acc, tweet) => acc + tweet.dayChange, 0) /
        tweets["Dogecoin"].length
    );
    setTeslaAvg(
      tweets["Tesla"].reduce((acc, tweet) => acc + tweet.dayChange, 0) /
        tweets["Tesla"].length
    );
  }, [tweets]);

  return (
    <div>
      <section className={css.metricButtonsContainer}>
        {metrics.map((metric) => (
          <div
            className={[
              css.metricButton,
              metric.metric === selectedMetric && css.selected,
            ].join(" ")}
            onClick={() => setMetric(metric.metric)}
            key={metric.metric}
          >
            <img
              alt="logo"
              className={css.icon}
              src={metric.src}
              width={24}
              height={24}
            />
            {metric.name}
          </div>
        ))}
      </section>
      <section style={{ display: "flex", gap: "32px" }}>
        <section className={css.container} ref={containerRef}>
          <svg height={"100%"} width={"100%"} ref={svgRef} />
        </section>
        {bitcoinAvg && dogecoinAvg && teslaAvg && (
          <section className={css.changeStats}>
            <span>Average asset price change following an Elon Musk tweet</span>
            <div>
              <img
                alt="logo"
                className={css.icon}
                src={uparrpw}
                width={30}
                height={30}
              />
              <span>Dogecoin</span>
              <span>{String(dogecoinAvg * 100).substring(0, 4)}%</span>
            </div>
            <div>
              <img
                alt="logo"
                className={css.icon}
                src={uparrpw}
                width={30}
                height={30}
              />
              <span>Bitcoin</span>
              <span>{String(bitcoinAvg * 100).substring(0, 4)}%</span>
            </div>
            <div>
              <img
                alt="logo"
                className={css.icon}
                src={uparrpw}
                width={30}
                height={30}
              />
              <span>Tesla</span>
              <span>{String(teslaAvg * 100).substring(0, 4)}%</span>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default GroupedTweetHistogram;

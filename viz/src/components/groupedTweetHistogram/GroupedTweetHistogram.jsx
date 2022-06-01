import React, { useEffect, useRef, useState } from "react";
import { addChart } from "./addChart";
import * as d3 from "d3";
import css from "./GroupedTweetHistogram.module.css";

import likes from "/like.svg";
import replies from "/reply.svg";
import retweets from "/retweet.svg";

const GroupedTweetHistogram = ({ tweets }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

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

  return (
    <div>
      <h4>Hover over each bar to see exact values!</h4>

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
              width={30}
              height={30}
            />
            {metric.name}
          </div>
        ))}
      </section>
      <section className={css.container} ref={containerRef}>
        <svg height={"100%"} width={"100%"} ref={svgRef} />
      </section>
    </div>
  );
};

export default GroupedTweetHistogram;

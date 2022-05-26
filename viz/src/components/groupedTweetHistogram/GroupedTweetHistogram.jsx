import React, { useEffect, useRef, useState } from "react";
import { addChart } from "./addChart";
import * as d3 from "d3";
import css from "./GroupedTweetHistogram.module.css";
import likes from "/Users/shrirangbagdi/Downloads/datavis-project-2022-visualizationclowns/viz/src/components/groupedTweetHistogram/likess.png"
import retweets from "/Users/shrirangbagdi/Downloads/datavis-project-2022-visualizationclowns/viz/src/components/groupedTweetHistogram/retweets.png"
import replies from "/Users/shrirangbagdi/Downloads/datavis-project-2022-visualizationclowns/viz/src/components/groupedTweetHistogram/repliess.png"
const GroupedTweetHistogram = ({ tweets }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const metrics = [
    { metric: "nlikes", name: "Likes" , src: likes},
    { metric: "nretweets", name: "Retweets", src: retweets },
    { metric: "nreplies", name: "Replies", src: replies },
  ];

  const [metric, setMetric] = useState("nlikes");

  useEffect(() => {
    if (!containerRef.current || !svgRef) return;

    const svg = d3.select(svgRef.current);
    svg.selectChildren().remove();

    let yValues = [];

    for (const [key, value] of Object.entries(tweets)) {
      let totalLikes = 0;
      value.forEach((tweet) => {
        totalLikes += Number(tweet[metric]);
      });
      yValues.push(totalLikes);
    }
    addChart(yValues, svg, containerRef.current);
  }, [tweets, metric]);

  return (
    <div>
     <h2> Average Engagement Per Tweet </h2>
      <section className={css.metricButtonsContainer}>
        {metrics.map((metric) => (
          <div
            className={css.metricButton}
            onClick={() => setMetric(metric.metric)}
            key={metric.metric}
          >
            <img alt = "logo" src = { metric.src} width={50} height={50} 
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

import React, { useEffect, useRef, useState } from "react";
import { addChart } from "./addChart";
import * as d3 from "d3";
import css from "./GroupedTweetHistogram.module.css";

const GroupedTweetHistogram = ({ tweets }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const [metric, setMetric] = useState("likes");

  useEffect(() => {
    if (!containerRef.current || !svgRef) return;

    const svg = d3.select(svgRef.current);
    svg.selectChildren().remove();

    let yValues = [];

    for (const [key, value] of Object.entries(tweets)) {
      let totalLikes = 0;
      tweets[key].forEach((tweet) => {
        totalLikes = Number(totalLikes) + Number(tweet.nlikes);
      });
      yValues.push(totalLikes / tweets[key].length);
    }
    addChart(yValues, svg, containerRef.current);
  }, [tweets]);

  return (
    <div>
      GroupedTweetHistogram
      <section className={css.container} ref={containerRef}>
        <svg height={"100%"} width={"100%"} ref={svgRef} />
      </section>
    </div>
  );
};

export default GroupedTweetHistogram;

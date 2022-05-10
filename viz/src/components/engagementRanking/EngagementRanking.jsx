import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { addTweetBox } from "../../utils/addTweet";

const EngagementRanking = ({ tweets }) => {
  const rankingRef = useRef(null);

  const order = (a, b) => d3.descending(Number(a.nlikes), Number(b.nlikes));

  const sortedTweets = tweets.sort(order).slice(0, 10);

  useEffect(() => {
    if (!rankingRef.current) return;
    d3.selectAll(".tweet-box").remove();
    sortedTweets.forEach((tweet) =>
      addTweetBox(tweet, d3.select(rankingRef.current))
    );
  }, [tweets]);

  return (
    <div>
      EngagementRanking
      <div ref={rankingRef} />
    </div>
  );
};

export default EngagementRanking;

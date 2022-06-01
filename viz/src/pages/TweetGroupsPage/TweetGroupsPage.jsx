import React, { useEffect, useRef } from "react";
import GroupedTweetHistogram from "../../components/groupedTweetHistogram/GroupedTweetHistogram";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import css from "./TweetGroupPage.module.css";
import * as d3 from "d3";

const TweetGroupsPage = ({ tweets }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(100px,5px)`);
        title.style("opacity", 1);
      }, 100);
    }
  }, []);

  return (
    <Layout>
      <h3
        ref={titleRef}
        style={{
          position: "relative",
          opacity: 0,
          left: "-100px",
          top: "-5px",
        }}
        className={css.title}
      >
        Tweets about which assets engages people?
      </h3>

      <section style={{ width: "80vw" }}>
        <GroupedTweetHistogram tweets={tweets} />
        <section style={{ display: "flex" }}>
          <Paragraph className={css.text}>
            We can see that the data points to Tesla having the highest
            engagement for likes, retweets, and shares. This makes sense as Elon
            Musk has the highest amount of interaction with Tesla since he is a
            key part of the company.
            <br />
            <br />
            Another takeaway is that tweets generally are much more liked than
            either retweeted or replied to.
          </Paragraph>
          <Paragraph className={css.text2}>
            All categories of assets explored increase following a tweet by Elon
            Musk. However, it is not that is causation as the overall asset
            prices have increased during these time frame.
          </Paragraph>
        </section>
      </section>
    </Layout>
  );
};

export default TweetGroupsPage;

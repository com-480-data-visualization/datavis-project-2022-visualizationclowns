import React, { useEffect, useRef } from "react";
import EngagementRanking from "../../components/engagementRanking/EngagementRanking";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import css from "./EngagementRankingPage.module.css";
import * as d3 from "d3";

const EngagementRankingPage = ({ tweets }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(0,100px)`);
        title.style("opacity", 1);
      }, 100);
    }
  }, []);

  return (
    <Layout>
      <h3
        ref={titleRef}
        style={{ top: "-100px", opacity: 0 }}
        className={css.title}
      >
        Which tweets precedes market swings?
      </h3>
      <section style={{ height: "50vh" }} id="disable">
        <EngagementRanking tweets={tweets} />
      </section>
      <section className={css.texts}>
        <section style={{ display: "flex", width: "600px", gap: "48px" }}>
          <Paragraph>
            One interesting correlation is that tweets with higher engagement
            correlate with higher variance in the following change of market
            price.
          </Paragraph>
          <Paragraph>
            Some tweets with very high numbers of replies, seem to correlate
            with large swings in the market.
          </Paragraph>
        </section>
      </section>
    </Layout>
  );
};

export default EngagementRankingPage;

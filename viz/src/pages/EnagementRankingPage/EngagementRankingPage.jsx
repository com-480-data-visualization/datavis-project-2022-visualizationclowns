import React from "react";
import EngagementRanking from "../../components/engagementRanking/EngagementRanking";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import css from "./EngagementRankingPage.module.css";

const EngagementRankingPage = ({ tweets }) => {
  return (
    <Layout>
      <h3 className={css.title}>Which tweets precedes market swings?</h3>
      <section style={{ height: "50vh" }} id="disable">
        <EngagementRanking tweets={tweets} />
      </section>
      <section className={css.texts}>
        <section>
          <Paragraph>
            One interesting correlation is that tweets with higher engagement
            correlate with higher variance in the following change of market
            price.
          </Paragraph>
        </section>
      </section>
    </Layout>
  );
};

export default EngagementRankingPage;

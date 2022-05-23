import React from "react";
import EngagementRanking from "../../components/engagementRanking/EngagementRanking";
import Layout from "../../components/layout/Layout";
import css from "./EngagementRankingPage.module.css";

const EngagementRankingPage = ({ tweets }) => {
  return (
    <Layout>
      <h3 className={css.title}>Which tweets precedes market swings?</h3>
      <section style={{ height: "100%" }} id="disable">
        <EngagementRanking tweets={tweets} />
      </section>
    </Layout>
  );
};

export default EngagementRankingPage;

import React from "react";
import EngagementRanking from "../../components/engagementRanking/EngagementRanking";
import Layout from "../../components/layout/Layout";

const EngagementRankingPage = ({ tweets }) => {
  return (
    <Layout>
      <section id="disable">
        <EngagementRanking tweets={tweets} />
      </section>
    </Layout>
  );
};

export default EngagementRankingPage;

import React from "react";
import Layout from "../../components/layout/Layout";

const EngagementRanking = ({ tweets }) => {
  return (
    <Layout>
      <section>
        <EngagementRanking tweets={tweets?.[selectedDataset]} />
      </section>
    </Layout>
  );
};

export default EngagementRanking;

import React from "react";
import Layout from "../../components/layout/Layout";

const TweetGroups = ({ tweets }) => {
  return (
    <Layout>
      <section>
        <GroupedTweetHistogram tweets={tweets} />
      </section>
    </Layout>
  );
};

export default TweetGroups;

import React from "react";
import GroupedTweetHistogram from "../../components/groupedTweetHistogram/GroupedTweetHistogram";
import Layout from "../../components/layout/Layout";

const TweetGroupsPage = ({ tweets }) => {
  return (
    <Layout>
      <section>
        <GroupedTweetHistogram tweets={tweets} />
      </section>
    </Layout>
  );
};

export default TweetGroupsPage;

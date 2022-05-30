import React from "react";
import GroupedTweetHistogram from "../../components/groupedTweetHistogram/GroupedTweetHistogram";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";

const TweetGroupsPage = ({ tweets }) => {
  return (
    <Layout>
      <section>
        <GroupedTweetHistogram tweets={tweets} />
        <Paragraph>
        We can see that the data points to Tesla having 
        the highest engagement for likes, retweets, and shares. 
        This makes sense as Elon Musk has the highest amount of 
        interaction with Tesla since he is a key part of the company. 
        </Paragraph>
      </section>
    </Layout>
  );
};

export default TweetGroupsPage;

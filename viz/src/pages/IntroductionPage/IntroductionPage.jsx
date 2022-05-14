import React from "react";
import Layout from "../../components/layout/Layout";
import css from "./IntroductionPage.module.css";
import { HeroStats } from "../../components/heroStats/HeroStats";
import Paragraph from "../../components/paragraph/Paragraph";

const Introduction = ({ nTweets }) => {
  return (
    <Layout>
      <article className={css.content}>
        <div className={css.title}>Is Elon Musk manipulating the market?</div>
        <section className={css.stats}>
          <HeroStats
            size={70}
            value={nTweets}
            text={"Total number of tweets"}
          />
          <HeroStats
            size={70}
            value={255}
            text={"Net Worth"}
            prefix={"$"}
            suffix={"B"}
          />
        </section>
        <section>
          <Paragraph className={css.introductionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
            congue eu consequat ac felis donec et. Gravida neque convallis a
            cras semper auctor. Egestas congue quisque egestas diam in arcu
            cursus. mi. <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
            congue eu consequat ac felis donec et. Gravida neque convallis a
            cras semper auctor. Egestas congue quisque egestas diam in arcu
            cursus. Augue mauris augue neque gravida in. Turpis massa sed
            elementum tempus egestas sed sed risus. Dignissim convallis aenean
            et tortor at. Tempus urna et pharetra pharetra massa massa ultricies
            mi.
          </Paragraph>
        </section>
      </article>
    </Layout>
  );
};

export default Introduction;

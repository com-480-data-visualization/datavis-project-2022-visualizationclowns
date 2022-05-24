import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import css from "./IntroductionPage.module.css";
import { HeroStats } from "../../components/heroStats/HeroStats";
import Paragraph from "../../components/paragraph/Paragraph";
import * as d3 from "d3";

const Introduction = ({ nTweets }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      title.style("transform", `translate(100px,0)`);
      title.style("opacity", 1);
    }
    if (textRef.current) {
      const text = d3.select(textRef.current);
      setTimeout(() => {
        text.style("transform", `translate(0,-100px)`);
        text.style("opacity", 1);
      }, 200);
    }
  }, []);

  return (
    <Layout>
      <article className={css.content}>
        <div
          ref={titleRef}
          style={{ position: "relative", opacity: 0, left: "-100px" }}
          className={css.title}
        >
          Is Elon Musk manipulating the market?
        </div>
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
        <section
          className={css.introductionText}
          style={{ position: "relative", opacity: 0, bottom: "-100px" }}
          ref={textRef}
        >
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

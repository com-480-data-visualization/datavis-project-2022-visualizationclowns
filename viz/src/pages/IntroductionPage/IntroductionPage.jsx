import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import css from "./IntroductionPage.module.css";
import { HeroStats } from "../../components/heroStats/HeroStats";
import Paragraph from "../../components/paragraph/Paragraph";
import * as d3 from "d3";
import Instruction from "../../components/instruction/Instruction";

const Introduction = ({ nTweets }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [showNavHint, setShowNavHint] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(100px,0)`);
        title.style("opacity", 1);
      }, 100);
    }
    if (textRef.current) {
      const text = d3.select(textRef.current);
      setTimeout(() => {
        text.style("transform", `translate(0,-100px)`);
        text.style("opacity", 1);
      }, 200);
    }
    setTimeout(() => {
      setShowNavHint(true);
    }, 5000);
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
            Elon Musk is a cultural phenomena of the twenty-first century and
            one of the world’s richest individuals. He has founded several
            incredibly successful companies including PayPal, Tesla, and SpaceX.
            <br />
            <br />
            With Elon Musk’s influence and cultural following including almost
            80M Twitter followers, many of his tweets can have far reaching
            effects. In recent years, Elon Musk has received criticism from
            media and regulators accusing him of market manipulation of stocks
            and cryptocurrencies
            <br />
            <br />
            This visualization aims to illustrate Elon Musk’s tweets impact on
            the stock and cryptocurrency markets. Follow this journey and
            investigate Elon Musk’s potential market influence.
          </Paragraph>
        </section>
        {showNavHint && <Instruction text={"Use arrow keys to navigate ›"} />}
      </article>
    </Layout>
  );
};

export default Introduction;

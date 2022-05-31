import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import css from "../../pages/IntroductionPage/IntroductionPage.module.css";
import { HeroStats } from "../../components/heroStats/HeroStats";
import Paragraph from "../../components/paragraph/Paragraph";
import * as d3 from "d3";
import Instruction from "../../components/instruction/Instruction";
import logo from "/Elon-Musk.jpg"
const ConclusionPage = ({ nTweets }) => {
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
          Can we consider Elon influential?
        </div>
        <center> <img src={logo} alt="Logo" width={300} height={200} /> </center>
        <section
          className={css.introductionText}
          style={{ position: "relative", opacity: 0, bottom: "-100px" }}
          ref={textRef}
        >
          <Paragraph className={css.introductionText}>
          Everytime Elon Musk tweets, the whole world is watching,
           reacting, and following. When it comes to the market, 
           it is difficult to know for sure if a change is due 
           to any type of influence that he has. There are many 
           factors at play which, however, isn't enough to 
           consider him uninfluential.

            <br />
            <br />
            If you look at the different tweets, there are many 
            instances such as the tweet on May 15, 2020 where he 
            tweeted “I still only own 0.25 Bitcoins btw” and the 
            Bitcoin asset price increased 3.67 %. Or when he tweeted 
            “Bitcoin is almost as bs as fiat money” and the Bitcoin 
            asset price increased 1.30 %. 
            <br />
            <br />
            Ultimately we leave the decision up to you, 
            and hope that these visualizations helped you to gain valuable insight. 
          </Paragraph>
        </section>
        {showNavHint && <Instruction text={"Use arrow keys to navigate ›"} />}
      </article>
    </Layout>
  );
};

export default ConclusionPage;

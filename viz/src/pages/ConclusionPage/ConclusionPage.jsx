import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import css from "../../pages/ConclusionPage/ConclusionPage.module.css";
import { HeroStats } from "../../components/heroStats/HeroStats";
import Paragraph from "../../components/paragraph/Paragraph";
import * as d3 from "d3";
import logo from "/elon-musk-transparent.png";
const ConclusionPage = ({ nTweets }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

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
  }, []);

  return (
    <div className={css.container}>
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "-100px",
          height: "50%",
        }}
      >
        <img src={logo} alt="Logo" height={"100%"} />
      </div>
      <Layout>
        <article className={css.content}>
          <div
            ref={titleRef}
            style={{ position: "relative", opacity: 0, left: "-100px" }}
            className={css.title}
          >
            Correlation does not equal causation
          </div>

          <section
            className={css.conclusionText}
            style={{ position: "relative", opacity: 0, bottom: "-100px" }}
            ref={textRef}
          >
            <Paragraph className={css.conclusionText}>
              Every time Elon Musk tweets, the whole world is watching,
              reacting, and following. When looking at some of his tweets, many
              of them seem to drive the market and correlate with market swings.
              <br />
              <br />
              Instances such as the tweet on May 17, 2021 where he tweeted “To
              clarify speculation, Tesla has not sold any Bitcoin” and the
              Bitcoin price fell by -15.01% or when he tweeted “Dogecoin is the
              people’s crypto” and Dogecoin subsequently rose by over 8%.
              However, just looking at his tweets only reveals parts of the
              picture and other factors could have an unknown impact. For
              example, just before he tweeted and clarified that Tesla had not
              sold any bitcoin, Tesla had announced that they would stop
              accepting bitcoin as a payment option, which may have had a
              greater influence on the Bitcoin price.
              <br />
              <br />
              It is very important to remember that correlation does not equal
              causation. Some tweets may mention information and opinions that
              could have an important impact on the asset prices, while other
              may only correlate with market volatility.
              <br />
              <br />
              There are many factors at play and throughout our visualizations
              we aim to expose some interesting patterns between Elon Musk’s
              Twitter activity and relevant asset prices. Ultimately, we leave
              the decision up to you, and hope that these visualizations helped
              you to gain valuable insight.
            </Paragraph>
          </section>
        </article>
      </Layout>
    </div>
  );
};

export default ConclusionPage;

import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import MainChart from "../../components/mainChart/MainChart";
import css from "./MainChartPage.module.css";
import * as d3 from "d3";

const MainChartPage = ({ tweets, asset }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(100px,0)`);
        title.style("opacity", 1);
      }, 100);
    }
  }, []);

  return (
    <Layout>
      <h3 style={{ left: "-100px" }} ref={titleRef} className={css.title}>
        Elon Musk driving or riding trends?
      </h3>
      <MainChart tweets={tweets} asset={asset} />
      {/* <Paragraph>
          Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Mattis
          rhoncus urna neque viverra. Aenean et tortor at risus viverra
          adipiscing at in. Natoque penatibus et magnis dis parturient montes
          nascetur. Euismod quis viverra nibh cras pulvinar mattis.
        </Paragraph> */}
    </Layout>
  );
};

export default MainChartPage;

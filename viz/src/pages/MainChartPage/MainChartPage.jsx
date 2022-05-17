import React from "react";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import MainChart from "../../components/mainChart/MainChart";

const MainChartPage = ({ tweets, asset }) => {
  return (
    <Layout>
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

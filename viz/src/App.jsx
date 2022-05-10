import { useEffect, useState } from "react";
import css from "./App.module.css";
import EngagementRanking from "./components/engagementRanking/EngagementRanking";
import GroupedTweetHistogram from "./components/groupedTweetHistogram/GroupedTweetHistogram";
import MainChart from "./components/mainChart/MainChart";
import Navigation from "./components/navigation/Navigation";
import Paragraph from "./components/paragraph/Paragraph";
import * as d3 from "d3";
import { HeroStats } from "./components/heroStats/HeroStats";

function App() {
  const [selectedDataset, setSelectedDataset] = useState("Bitcoin");
  const [datasets, setDatasets] = useState(undefined);
  const [tweets, setTweets] = useState(undefined);
  const [allTweets, setAllTweets] = useState(undefined);

  useEffect(() => {
    (async () => {
      const bitcoin = await d3.csv("/coin_Bitcoin.csv");
      const dogecoin = await d3.csv("/coin_Dogecoin.csv");
      const tesla = await d3.csv("/tesla.csv");
      const tweetsDataset = await d3.csv("/alltweets.csv");

      setAllTweets(tweetsDataset);

      const datasets = {
        Bitcoin: bitcoin,
        Dogecoin: dogecoin,
        Tesla: tesla,
      };

      const filter_regex = (regex) => {
        return (tweet) => {
          return tweet.tweet.toLowerCase().match(new RegExp(regex));
        };
      };

      const filtered_tweets = {
        Bitcoin: tweetsDataset.filter(filter_regex(`.*(bitcoin|btc).*`)),
        Dogecoin: tweetsDataset.filter(filter_regex(`.*(doge).*`)),
        Tesla: tweetsDataset.filter(filter_regex(`.*(tesla stock)|(tsla).*`)),
      };

      setDatasets(datasets);
      setTweets(filtered_tweets);
    })();
  }, []);

  if (!tweets || !datasets || !allTweets) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className={css.header}>
        <Navigation
          selectedDataset={selectedDataset}
          setSelectedDataset={setSelectedDataset}
        />
      </header>
      <article className={css.content}>
        <div className={css.title}>Visualization Clowns</div>
        <section className={css.stats}>
          <HeroStats value={allTweets.length} text={"Total number of tweets"} />
          <HeroStats value={255} text={"Net Worth"} prefix={"$"} suffix={"B"} />
        </section>
        <section>
          <Paragraph>
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
        <section>
          <MainChart
            tweets={tweets?.[selectedDataset]}
            asset={datasets?.[selectedDataset]}
          />
          <Paragraph>
            Commodo elit at imperdiet dui accumsan sit amet nulla facilisi.
            Mattis rhoncus urna neque viverra. Aenean et tortor at risus viverra
            adipiscing at in. Natoque penatibus et magnis dis parturient montes
            nascetur. Euismod quis viverra nibh cras pulvinar mattis.
          </Paragraph>
        </section>
        <section>
          <EngagementRanking tweets={tweets?.[selectedDataset]} />
        </section>
        <section>
          <GroupedTweetHistogram tweets={tweets} />
        </section>
        <section>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
            integer vitae justo eget magna. Tellus in metus vulputate eu
            scelerisque felis imperdiet proin. Vehicula ipsum a arcu cursus
            vitae congue mauris rhoncus aenean. Est ultricies integer quis
            auctor elit sed. Varius sit amet mattis vulputate enim nulla. Sit
            amet venenatis urna cursus eget. Varius vel pharetra vel turpis nunc
            eget lorem dolor sed. Facilisis volutpat est velit egestas dui id
            ornare arcu. Est ullamcorper eget nulla facilisi etiam. Eget gravida
            cum sociis natoque penatibus et magnis.
          </Paragraph>
        </section>
      </article>
    </div>
  );
}

export default App;

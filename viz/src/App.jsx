import { useEffect, useState } from "react";
import css from "./App.module.css";
import Navigation from "./components/navigation/Navigation";
import * as d3 from "d3";
import EngagementRanking from "./pages/EnagementRankingPage/EngagementRankingPage";
import Introduction from "./pages/IntroductionPage/IntroductionPage";
import { Route, Routes } from "react-router-dom";
import MainChartPage from "./pages/MainChartPage/MainChartPage";

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

      const bisector = d3.bisector((d) => new Date(d.Date));

      // basic filter 'bitcoin': 36, 'doge': 67, 'tesla': 1227, 'tesla stock': 13,
      const filtered_tweets = {
        Bitcoin: tweetsDataset
          .filter(filter_regex(`(bitcoin|btc)`))
          .map((tweet) => {
            const index =
              bisector.left(bitcoin, new Date(tweet.created_at)) - 1;
            return {
              ...tweet,
              dayChange:
                (bitcoin[index + 2].Close - bitcoin[index].Close) /
                bitcoin[index].Close,
            };
          }),
        Dogecoin: tweetsDataset.filter(filter_regex(`doge`)).map((tweet) => {
          const index = bisector.left(dogecoin, new Date(tweet.created_at)) - 1;
          return {
            ...tweet,
            dayChange:
              (dogecoin[index + 2].Close - dogecoin[index].Close) /
              dogecoin[index].Close,
          };
        }),
        Tesla: tweetsDataset
          .filter(filter_regex(`((tesla.*(stock|private))|(tsla))`))
          .map((tweet) => {
            const index = bisector.left(tesla, new Date(tweet.created_at)) - 1;
            return {
              ...tweet,
              dayChange:
                (tesla[index + 2].Close - tesla[index].Close) /
                tesla[index].Close,
              days: [tesla[index + 2], tesla[index]],
            };
          }),
      };
      console.log("filtered: ", filtered_tweets);

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
        <Routes>
          <Route
            path="/"
            element={<Introduction nTweets={allTweets.length} />}
          />
          <Route
            path="/main"
            element={
              <MainChartPage
                tweets={tweets?.[selectedDataset]}
                asset={datasets?.[selectedDataset]}
              />
            }
          />
          <Route path="/ranking" element={<EngagementRanking />} />
        </Routes>
      </article>
    </div>
  );
}

export default App;

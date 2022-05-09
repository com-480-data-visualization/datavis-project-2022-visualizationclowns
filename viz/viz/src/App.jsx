import css from "./App.module.css";
import EngagementRanking from "./components/engagementRanking/EngagementRanking";
import GroupedTweetHistogram from "./components/groupedTweetHistogram/GroupedTweetHistogram";
import MainChart from "./components/mainChart/MainChart";
import Navigation from "./components/navigation/Navigation";
import Paragraph from "./components/paragraph/Paragraph";

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
        <div className={css.title}>Visualization Clowns</div>
      </header>
      <article className={css.content}>
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
          <MainChart />
          <Paragraph>
            Commodo elit at imperdiet dui accumsan sit amet nulla facilisi.
            Mattis rhoncus urna neque viverra. Aenean et tortor at risus viverra
            adipiscing at in. Natoque penatibus et magnis dis parturient montes
            nascetur. Euismod quis viverra nibh cras pulvinar mattis.
          </Paragraph>
        </section>
        <section>
          <EngagementRanking />
        </section>
        <section>
          <GroupedTweetHistogram />
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

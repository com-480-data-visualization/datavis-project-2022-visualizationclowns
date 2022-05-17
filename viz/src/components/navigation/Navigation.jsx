import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = ({ selectedDataset, setSelectedDataset }) => {
  const datasets = ["Bitcoin", "Dogecoin", "Tesla"];
  const sections = [
    { name: "Start", link: "/" },
    { name: "Main", link: "/main" },
    { name: "Enagement-Ranking", link: "/ranking" },
    { name: "Tweet-Groups", link: "/groups" },
    { name: "Conclusion", link: "/conclusion" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [scroll, setScroll] = useState(0);

  function onWheel(e) {
    if (e.path.some((tag) => tag.id == "disable")) return;

    const delta = e.deltaY / 8;
    setScroll((prev) =>
      Math.min(Math.max(prev + delta, 0), (sections.length - 1) * 100)
    );
  }

  useEffect(() => {
    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    if (scroll % 100 === 0) {
      navigate(sections[scroll / 100].link);
    }
  }, [scroll]);

  return (
    <nav className={css.container}>
      <article className={css.content}>
        <section className={css.radioButtons}>
          {datasets.map((dataset) => (
            <div
              className={[dataset === selectedDataset && css.selected].join(
                " "
              )}
              key={dataset}
              onClick={() => setSelectedDataset(dataset)}
            >
              {dataset}
            </div>
          ))}
        </section>
        <section className={css.navigationBalls}>
          {sections.map((section) => (
            <div
              onClick={() => navigate(section.link)}
              style={{ opacity: section.link === path ? 0.8 : 0.6 }}
              key={section.name}
              className={css.navBall}
            />
          ))}
        </section>
      </article>
    </nav>
  );
};

export default Navigation;

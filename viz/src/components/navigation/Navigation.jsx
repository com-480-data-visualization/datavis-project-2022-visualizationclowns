import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = ({ selectedDataset, setSelectedDataset }) => {
  const datasets = ["Dogecoin", "Bitcoin", "Tesla"];
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
  const [index, setIndex] = useState(0);

  function onKeyPress(e) {
    if (e.key === "ArrowLeft") {
      setScroll((prev) => prev - 105);
    }
    if (e.key === "ArrowRight") {
      setScroll((prev) => prev + 105);
    }
    if (e.key === "1") {
      setSelectedDataset("Dogecoin");
    }
    if (e.key === "2") {
      setSelectedDataset("Bitcoin");
    }
    if (e.key === "3") {
      setSelectedDataset("Tesla");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  useEffect(() => {
    if (Math.abs(scroll) > 100) {
      setScroll(0);
      if (index < sections.length - 1 && scroll > 0) {
        navigate(sections[index + 1].link);
        setIndex((prev) => prev + 1);
      }
      if (index > 0 && scroll < 0) {
        navigate(sections[index - 1].link);
        setIndex((prev) => prev - 1);
      }
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
          {sections.map((section, idx) => (
            <div
              onClick={() => {
                navigate(section.link);
                setScroll(0);
                setIndex(idx);
              }}
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

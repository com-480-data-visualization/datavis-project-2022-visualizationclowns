import React from "react";
import css from "./Navigation.module.css";

const Navigation = ({ selectedDataset, setSelectedDataset }) => {
  const datasets = ["Bitcoin", "Dogecoin", "Tesla"];

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
      </article>
    </nav>
  );
};

export default Navigation;

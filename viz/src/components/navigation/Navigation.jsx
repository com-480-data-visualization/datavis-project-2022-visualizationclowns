import React from "react";
import css from "./Navigation.module.css";

const Navigation = ({ selectedDataset, setSelectedDataset }) => {
  const datasets = ["Bitcoin", "Dogecoin", "Tesla"];

  return (
    <nav className={css.container}>
      Navigation
      <section className={css.radioButtons}>
        {datasets.map((dataset) => (
          <div
            className={[dataset === selectedDataset && css.selected].join(" ")}
            key={dataset}
            onClick={() => setSelectedDataset(dataset)}
          >
            {dataset}
          </div>
        ))}
      </section>
    </nav>
  );
};

export default Navigation;

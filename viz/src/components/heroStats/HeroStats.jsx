import React, { useEffect, useState } from "react";
import css from "./HeroStats.module.css";

export const HeroStats = ({ value, text, prefix, suffix }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <article className={css.container}>
      <span>{text}</span>
      <div style={{ display: "flex" }}>
        <div style={{ "--num": loaded ? value : 0 }} className={css.counter}>
          {prefix}
        </div>
        <span className={css.suffix}>{suffix}</span>
      </div>
    </article>
  );
};

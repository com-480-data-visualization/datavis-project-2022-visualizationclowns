import React, { useEffect, useState } from "react";
import css from "./HeroStats.module.css";

export const HeroStats = ({ value, text, prefix, suffix, size = 54 }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <article className={css.container}>
      <span style={{ fontSize: size - 36 }}>{text}</span>
      <div style={{ display: "flex" }}>
        <div
          style={{ "--num": loaded ? value : 0, fontSize: size }}
          className={css.counter}
        >
          {prefix}
        </div>
        <span className={css.suffix} style={{ fontSize: size - 6 }}>
          {suffix}
        </span>
      </div>
    </article>
  );
};

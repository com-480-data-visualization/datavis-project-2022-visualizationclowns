import React from "react";
import css from "./Spinner.module.css";

const Spinner = ({ margin, className }) => (
  <span className={className}>
    <div style={{ margin: `${margin}` }} className={css.spinner} />
  </span>
);

export default Spinner;

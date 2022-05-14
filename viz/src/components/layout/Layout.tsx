import React from "react";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Layout;

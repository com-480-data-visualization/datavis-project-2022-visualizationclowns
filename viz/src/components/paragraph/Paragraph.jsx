import React from "react";

const Paragraph = ({ children, className }) => {
  return <div className={[className].join(" ")}>{children}</div>;
};

export default Paragraph;
